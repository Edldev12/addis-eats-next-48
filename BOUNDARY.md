# Addis Eats — Server / Client Boundary

## Overview

Addis Eats keeps components on the server by default.

A component becomes a Client Component only when it needs browser-specific features such as:

* React state
* React hooks
* event handlers
* client-side cart state
* browser interaction

The main rule is:

> Keep components on the server unless they need browser state or browser event handlers.

---

## Server Components

These components remain Server Components:

```text
app/layout.js
app/page.js
app/menu/layout.js
app/menu/page.js
app/menu/[id]/page.js
app/checkout/page.js
components/DishList.jsx
components/DishCard.jsx
```

They do not need browser state or event handlers.

### `app/layout.js`

The root layout remains a Server Component.

It renders the client provider around the application:

```jsx
<Providers>{children}</Providers>
```

The layout itself does not need `"use client"`.

---

### `app/page.js`

The home page is a Server Component.

It contains static landing-page content and does not need browser interaction.

---

### `app/menu/page.js`

The menu page is a Server Component.

It directly reads the dish data:

```js
const dishes = getDishes();
```

The page also uses:

```js
export const revalidate = 3600;
```

This allows the menu route to use ISR.

The data flow is:

```text
getDishes()
    ↓
app/menu/page.js
    ↓
DishList
    ↓
DishCard
```

---

### `app/menu/[id]/page.js`

The dynamic dish page remains a Server Component.

It uses:

```js
generateStaticParams()
```

to generate static pages for the available dishes.

It also uses:

```js
notFound();
```

when the requested dish does not exist.

The `AddToCartButton` is passed into this Server Component as a Client Component.

---

### `components/DishList.jsx`

`DishList` is a Server Component.

It receives the dishes from the menu page and renders the dish cards.

It does not need:

* `useState`
* `useEffect`
* `onClick`
* browser APIs

Therefore it stays on the server.

---

### `components/DishCard.jsx`

`DishCard` is also a Server Component.

It displays:

* dish image
* dish name
* price
* category
* description
* links

The interactive `AddToCartButton` is kept as a separate Client Component.

---

### `app/checkout/page.js`

The checkout page is a Server Component.

It contains:

```js
export const dynamic = "force-dynamic";
```

This makes the checkout route dynamic.

The page renders the client-side checkout form:

```jsx
<CheckoutForm />
```

The boundary is:

```text
app/checkout/page.js
        ↓
CheckoutForm.jsx
```

The page itself does not need `"use client"`.

---

## Client Components

The following components use `"use client"`.

### `app/providers.jsx`

```js
"use client";
```

The provider needs to be a Client Component because it owns the cart state using React hooks.

It uses:

```js
useState()
createContext()
useContext()
```

It provides:

```text
cart
addToCart
removeFromCart
clearCart
```

The cart data remains in the browser.

---

### `components/CategoryBar.jsx`

```js
"use client";
```

`CategoryBar` is a Client Component because it handles browser-side menu interaction.

It renders category links and responds to user selection.

---

### `components/AddToCartButton.jsx`

```js
"use client";
```

This component needs browser interaction because it uses:

```js
onClick
```

It also accesses the cart context:

```js
useCart()
```

The flow is:

```text
User clicks Add to Cart
        ↓
AddToCartButton
        ↓
useCart()
        ↓
addToCart()
        ↓
Cart Context
```

---

### `app/cart/page.js`

```js
"use client";
```

The cart page needs to read and modify browser-side cart state.

It uses:

```js
useCart()
```

and allows the user to:

* view cart items
* remove items
* clear the cart
* calculate the total
* continue to checkout

The cart stays private to the browser tab.

---

### `components/CheckoutForm.jsx`

```js
"use client";
```

The checkout form is a Client Component because it needs:

```js
useState()
useCart()
```

It manages:

* customer name
* phone number
* form state
* validation errors
* submitting state
* cart contents
* order total

The important boundary is:

```text
Server Component
app/checkout/page.js
        ↓
Client Component
CheckoutForm.jsx
```

---

## Server Action

The server action is located in:

```text
app/actions.js
```

It begins with:

```js
"use server";
```

The `placeOrder` function executes on the server.

The flow is:

```text
CheckoutForm
      ↓
placeOrder()
      ↓
validateOrder()
      ↓
Create Order
```

The server action does not trust client-side validation.

It validates the submitted:

* name
* phone
* items

again on the server.

---

## Data Movement

### Menu Data

Menu data stays on the server:

```text
getDishes()
      ↓
app/menu/page.js
      ↓
DishList
      ↓
DishCard
```

The menu Server Component does not need to fetch its own API endpoint.

---

### Cart Data

Cart data stays on the client:

```text
AddToCartButton
      ↓
CartContext
      ↓
cart state
      ↓
CartPage
```

The cart requires browser state, so these components use the Client Component boundary.

---

### Checkout Data

Checkout crosses the Server/Client boundary:

```text
Client Cart
      ↓
CheckoutForm
      ↓
placeOrder()
      ↓
Server Action
      ↓
validateOrder()
      ↓
Order
```

The client collects the order information, but the server performs the final validation.

---

## API Route Handlers

The API route handlers run on the server.

### Dishes API

```text
app/api/dishes/route.js
```

It handles:

```text
GET /api/dishes
```

The handler reads the dish data on the server and returns JSON.

---

### Orders API

```text
app/api/orders/route.js
```

It handles:

```text
POST /api/orders
```

The server validates the request before creating the order.

Invalid data returns:

```text
422 Unprocessable Entity
```

Valid data returns:

```text
201 Created
```

---

## Validation Boundary

Validation is performed on the server.

The shared validation function is:

```text
lib/validation.js
```

It is used by:

```text
Server Action
     ↓
validateOrder()

Orders API
     ↓
validateOrder()
```

This prevents the browser from being the final authority over submitted data.

---

## Security Boundary

Client Components are not trusted simply because they contain form validation.

The server validates the submitted data again.

The important rule is:

```text
Browser
   ↓
Untrusted input
   ↓
Server validation
   ↓
Accepted / rejected
```

No secret value is placed inside a Client Component.

---

## Why `"use client"` Is Not Everywhere

The application does **not** put `"use client"` on every component.

Instead:

```text
Server
├── layout
├── home
├── menu
├── dish pages
├── dish list
├── dish cards
└── checkout page
        │
        ├── Client
        │   └── CheckoutForm
        │
        └── Server Action
            └── placeOrder
```

This keeps the Server/Client boundary as small as practical.

---

## Final Boundary Map

```text
app/layout.js
    │
    └── Providers ─────────────── Client
          │
          ├── app/page.js ─────── Server
          │
          ├── app/menu/page.js ── Server
          │       │
          │       ├── CategoryBar ─── Client
          │       └── DishList ────── Server
          │              └── DishCard ─ Server
          │
          ├── app/menu/[id]/page.js ─ Server
          │       └── AddToCartButton ─ Client
          │
          ├── app/cart/page.js ─── Client
          │
          └── app/checkout/page.js ─ Server
                  │
                  └── CheckoutForm ─ Client
                          │
                          └── placeOrder()
                                ↓
                           Server Action
                                ↓
                         validateOrder()
```

## Boundary Verification

The production build confirms the intended rendering strategy:

○ /                    Static
○ /cart                Static route shell
ƒ /checkout            Dynamic
○ /menu                ISR
● /menu/kitfo          SSG
● /menu/shiro          SSG
● /menu/pizza          SSG
ƒ /api/dishes          Route Handler
ƒ /api/orders          Route Handler

The main Client Components are limited to places that require browser interaction or state.
