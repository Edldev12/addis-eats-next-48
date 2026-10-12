# Authentication & Authorization

## Overview

Addis Eats uses session-based authentication with a signed JWT stored in an HTTP-only cookie.

The authentication system protects private pages, APIs, and order ownership.

## Demo Accounts

### Customer

- Phone: `0911111111`
- Password: `123456`
- Role: `customer`

### Staff

- Phone: `0922222222`
- Password: `123456`
- Role: `staff`

> These accounts are for classroom demonstration only.

## Session

A successful sign-in creates a JWT session containing:

- User ID
- User name
- User role
- Issued time
- Expiration time

The JWT is stored in an HTTP-only `session` cookie.

The cookie uses:

- `httpOnly: true`
- `sameSite: "lax"`
- `secure: true` in production
- 7-day expiration

## Protected Routes

The following routes require authentication:

- `/checkout`
- `/orders`
- `/orders/[id]`
- `/kitchen`

Unauthenticated users are redirected to:

```text
/signin?next=<requested-path>

Role-Based Authorization

The /kitchen route is restricted to staff users.

Customer:

/kitchen → /

Staff:

/kitchen → Kitchen page

Order Ownership

Every order stores the authenticated user's ID:

{
  userId: user.id
}

Customers can only access their own orders.

Staff users can access all orders.

The API returns:

    401 Unauthorized when no valid session exists

    403 Forbidden when a customer attempts to access another user's order

    404 Not Found when an order does not exist

API Protection
GET /api/orders

Requires authentication.

Customers receive only their own orders.

Staff users receive all orders.
POST /api/orders

Requires authentication.

The server gets the userId from the session instead of trusting a user-supplied ID.
GET /api/orders/[id]

Requires authentication and verifies order ownership.
Middleware / Proxy

Next.js 16 uses proxy.js for request interception.

The proxy:

    Reads the session cookie.

    Verifies the JWT.

    Redirects unauthenticated users.

    Checks the staff role for /kitchen.

Server-side authorization is also performed inside protected pages and APIs as defense in depth.
Sign Out

Signing out clears the session cookie.

After sign out, protected routes require authentication again.
Security Measures

The application includes:

    HTTP-only session cookie

    Signed JWT

    Session expiration

    Server-side authorization

    Role-based access control

    Order ownership checks

    API authentication

    Open-redirect protection for the next parameter

    Input validation for orders

Demo Limitations

This project is a classroom demonstration.

The demo users and passwords are stored directly in the application code. A production application should use:

    A database for users

    Password hashing such as Argon2 or bcrypt

    Secure secret management

    A proper authentication provider or production-ready auth system

    Persistent order storage

    Rate limiting and additional security controls


Save the file.

Then verify:

```powershell
Get-Content AUTH.md
## Three-Layer Protection

Protected resources use defense in depth. Each layer has a different responsibility.

### Layer 1 — Proxy

The `proxy.js` file protects protected routes before the request reaches the page.

It checks whether the session cookie exists and redirects unauthenticated users to:

```text
/signin?next=<requested-path>
```

For `/kitchen`, the proxy also checks that the authenticated user has the `staff` role.

**What this layer proves:** the request has passed the route-level access gate.

### Layer 2 — Page Check

Protected server pages verify the session again on the server.

For example, `/orders`, `/orders/[id]`, and `/checkout` do not rely only on the proxy.

**What this layer proves:** the session is valid when the protected page is rendered.

### Layer 3 — Query / Action Check

Database-style queries and server actions perform the final authorization check.

Order queries are scoped to the authenticated user's ID. Actions also verify authentication and authorization before changing data.

Conceptually:

```js
const orders = getOrdersFor(session.user.id);
```

An order ID supplied by the browser is never treated as proof of ownership.

**What this layer proves:** the authenticated user is actually allowed to access or modify the specific resource.

## Three Security Attack Tests

### Attack 1 — Signed-out user calls a protected action

A signed-out user attempts to call an order action such as:

```text
cancelOrder("ord_812")
```

**Result:** the action refuses the request because there is no valid authenticated session.

**Stopped by:** the server-side action authentication check.

### Attack 2 — User changes the order ID

A signed-in customer attempts to access another customer's order by changing the order ID in the URL or API request.

**Result:** the server checks ownership and refuses access to an order that does not belong to the authenticated user.

**Stopped by:** the scoped order query / ownership check.

### Attack 3 — Open redirect through `next`

An attacker attempts:

```text
/signin?next=https://example.com
```

**Result:** after signing in, the application does not redirect to the external website. The destination is restricted to a safe internal path.

**Stopped by:** open-redirect protection in the sign-in flow.

## Defense-in-Depth Summary

| Layer | Responsibility | Example |
|---|---|---|
| Proxy | Route-level protection | Check session before `/orders` |
| Page | Server-side authentication | Verify session before rendering |
| Query / Action | Resource authorization | Scope orders to `session.user.id` |

No single client-side check is treated as sufficient authorization. Protected data and mutations are verified on the server.