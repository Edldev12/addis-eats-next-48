# Addis Eats — Rendering Strategy

## Route Strategy

| Route         | Strategy               | Reason                                                                                  |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `/`           | Static                 | The landing page does not need request-time data.                                       |
| `/menu`       | ISR                    | Menu data can be refreshed periodically with `revalidate = 3600`.                       |
| `/menu/[id]`  | Static                 | Dish pages are generated with `generateStaticParams()`.                                 |
| `/cart`       | Client                 | Cart state belongs to the browser tab and requires interactive state.                   |
| `/checkout`   | Client + Server Action | Checkout uses client-side cart state and sends validated order data to a server action. |
| `/api/dishes` | Route Handler          | Provides dish data through an HTTP endpoint.                                            |
| `/api/orders` | Route Handler          | Accepts orders and performs server-side validation.                                     |

---

## Home Page

### Route

```text
/
```

### File

```text
app/page.js
```

### Strategy

Static.

The home page contains the Addis Eats landing content and does not require request-time data.

It can therefore be rendered as a static page.

---

## Menu Page

### Route

```text
/menu
```

### File

```text
app/menu/page.js
```

### Strategy

ISR.

The menu page is a Server Component.

It reads the dish data directly:

```js
const dishes = getDishes();
```

The route uses:

```js
export const revalidate = 3600;
```

This allows the menu to be regenerated periodically instead of being rendered for every request.

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

`DishList` and `DishCard` do not need browser state, so they remain Server Components.

`CategoryBar` is a Client Component because it handles browser-side category interaction.

---

## Dynamic Dish Page

### Route

```text
/menu/[id]
```

### File

```text
app/menu/[id]/page.js
```

### Strategy

Static generation.

The page uses:

```js
generateStaticParams()
```

to generate pages for the available dishes.

The data flow is:

```text
generateStaticParams()
        ↓
/menu/kitfo
/menu/shiro
/menu/pizza
```

The page gets the requested dish with:

```js
getDishById(id)
```

If the dish does not exist, the page calls:

```js
notFound();
```

This displays the application's 404 page.

The `AddToCartButton` is a Client Component because it uses an `onClick` event and updates the cart.

---

## Cart Page

### Route

```text
/cart
```

### File

```text
app/cart/page.js
```

### Strategy

Client Component.

The cart must remain private to the browser tab and requires interactive state.

The page reads the cart from:

```js
useCart()
```

It allows the user to:

* view cart items
* view quantities
* remove items
* clear the cart
* calculate the running total
* continue to checkout

The cart state is stored inside the client-side `Providers` component.

The data flow is:

```text
AddToCartButton
        ↓
CartContext
        ↓
cart state
        ↓
CartPage
```

---

## Checkout Page

### Route

```text
/checkout
```

### File

```text
app/checkout/page.js
```

### Strategy

Client Component + Server Action.

The checkout page needs client-side access to the cart and interactive form state.

The form collects:

* customer name
* phone number
* cart items

The data is sent to:

```js
placeOrder()
```

The server action is defined in:

```text
app/actions.js
```

The server action validates the submitted data again on the server.

The flow is:

```text
Client Cart
     ↓
Checkout Form
     ↓
placeOrder()
     ↓
validateOrder()
     ↓
Order Created
```

The server remains responsible for validation.

---

## API: Dishes

### Route

```text
/api/dishes
```

### File

```text
app/api/dishes/route.js
```

### Strategy

Route Handler.

The route provides dish data through an HTTP endpoint.

The route uses a `GET` handler.

This endpoint is separate from the direct server-side data access used by the `/menu` Server Component.

---

## API: Orders

### Route

```text
/api/orders
```

### File

```text
app/api/orders/route.js
```

### Strategy

Route Handler.

The route accepts orders through a `POST` request.

The request body is validated on the server using:

```js
validateOrder()
```

If validation fails, the route returns:

```text
422 Unprocessable Entity
```

with field-level validation errors.

For valid data, the route creates an order and returns:

```text
201 Created
```

---

## Rendering Decision Summary

The application uses different rendering strategies based on what each route needs.

```text
/                 → Static

/menu             → ISR

/menu/[id]        → Static Generation

/cart             → Client

/checkout         → Client + Server Action

/api/dishes       → Route Handler

/api/orders       → Route Handler
```

The main principle is:

> Keep pages on the server unless they need browser state or browser event handlers.

This keeps the Server/Client boundary as small as possible while still allowing the interactive parts of Addis Eats to work in the browser.
