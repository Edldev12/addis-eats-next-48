# Addis Eats Data Fetching Report

## Overview

Addis Eats follows a server-first data-fetching strategy.

Public and private page data is fetched on the server when possible. Client-side fetching is used only when user interaction or live refresh requires it.

## Data Fetching Decisions

| Data | Where | Key / Endpoint | Refresh Rule | Reason |
|---|---|---|---|---|
| Menu and dishes | Server | `getDishes()` | ISR every 3600 seconds | Public menu data should be server-rendered, cacheable, and indexable |
| Individual dish | Server | `getDishById(id)` | Static/server rendering | Dish pages are public and can be generated from known dish data |
| Order history | Server | `/api/orders` | Request-time | Orders are private and must be scoped to the authenticated session |
| Order status | Server first, then client | `/api/orders/[id]` | Poll every 5 seconds | The first result is available on the server, while the client needs live updates |
| Menu search | Client | `/api/dishes?q=...` | Debounced 300 ms | Search depends directly on user typing |
| Cart | Client | React Context | Browser state | Cart changes immediately in response to user interaction |

## Menu Data

The `/menu` page runs on the server and uses:

```js
const dishes = getDishes();
```

The menu is configured with:

```js
export const revalidate = 3600;
```

This allows the public menu to be cached and revalidated every hour.

The menu data does not need to be fetched in the browser because it is public and does not depend on the logged-in user.

## Individual Dish Data

Individual dish pages use:

```js
getDishById(id)
```

The dish data is public, so it is loaded on the server rather than fetched from the browser.

Unknown dish IDs are handled with the application's not-found behavior.

## Order History

Order history is private data.

The server checks the authenticated session before returning orders. Customer queries are scoped to the authenticated user's ID rather than trusting a user ID supplied by the browser.

Conceptually:

```js
getOrdersFor(session.user.id)
```

This prevents one customer from requesting another customer's orders.

Staff users can access the appropriate staff-level order data according to the authorization rules documented in `AUTH.md`.

## Order Status Polling

The order detail page gets the initial order status on the server.

The client then uses SWR to keep the status updated:

```js
const { data, error, isLoading } = useSWR(
  `/api/orders/${id}`,
  fetcher,
  {
    fallbackData: initial,
    refreshInterval: 5000,
  }
);
```

The important points are:

- The first status is seeded by the server.
- `fallbackData` displays the server result immediately.
- SWR polls the API every 5 seconds.
- The browser receives updated order status without a page reload.

This is appropriate for order tracking because status can change while the user is viewing the page.

## Menu Search

Menu search is intentionally client-side because it depends on user typing.

The search input waits 300 ms before sending a request:

```js
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedTerm(term);
  }, 300);

  return () => clearTimeout(timer);
}, [term]);
```

SWR then requests:

```text
/api/dishes?q=<search-term>
```

The request is disabled when the search term is empty:

```js
debouncedTerm
  ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}`
  : null
```

This prevents unnecessary requests while the user is not searching.

`keepPreviousData: true` keeps the previous results visible while a new search request is loading.

## Cart State

The shopping cart is client-side state because users need immediate feedback when adding, removing, or clearing items.

The cart does not need to be fetched from the server for every interaction.

The server still validates the order during checkout instead of trusting client-provided values.

## Server vs Client Rules

The project follows these rules:

### Use the server when:

- Data is public.
- Data should be indexed by search engines.
- Data depends on the authenticated session.
- Data requires authorization or ownership checks.
- Data does not require immediate browser interaction.

### Use the client when:

- Data depends directly on user interaction.
- Data needs continuous polling.
- UI state changes frequently.
- Browser state is required.

## Seeded Queries

The project intentionally seeds the first result for order status on the server.

This avoids making the user wait for the first client-side polling request.

The search feature does not require seeded data because search results depend on the user's current input.

## Security Boundary

Client-side fetching does not replace server-side authorization.

For private resources, the server verifies the session and ownership on every protected request.

The browser can request an order ID, but it cannot decide whether that order belongs to the current user.

## Summary

Addis Eats uses a server-first approach:

1. Public menu data is rendered on the server.
2. Individual dish data is resolved on the server.
3. Private order history is fetched using the authenticated session.
4. Order status is seeded on the server and polled on the client.
5. Menu search is debounced and fetched on the client.
6. Cart state remains in the browser.
7. Authorization is always enforced on the server.
8. Client-side fetching is used only where interaction or live updates require it.