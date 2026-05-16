# Essence - E-Commerce Fashion Store

## Project Overview
A React-based e-commerce frontend for a fashion store called **Essence**. Built with React, React Router DOM, Context API, and Tailwind CSS.

---

## Tech Stack
- **React** — UI library
- **React Router DOM** — client-side routing
- **Context API** — global state management
- **Tailwind CSS** — styling
- **Fuse.js** — fuzzy search
- **React Toastify** — toast notifications
- **Vite** — build tool

---

## Project Structure
```
src/
├── assets/         # images and product data
├── components/     # reusable UI components
├── context/        # global state (ShopContext)
├── pages/          # route-level pages
└── App.jsx         # root component with routes
```

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Hero, carousels, policy, newsletter |
| `/latest` | LatestCollectionPage | Grid of first 10 products |
| `/bestsellers` | BestSellerPage | Grid of bestseller products |
| `/collection` | Collection | All products with filter, sort, search, pagination |
| `/product/:productId` | Product | Single product detail with related products |
| `/cart` | Cart | Shopping cart |
| `/login` | Login | Login page |
| `/place-order` | PlaceOrder | Checkout |
| `/orders` | Orders | Order history |
| `/about` | About | About page |
| `/contact` | Contact | Contact page |

---

## Interview Questions & Answers

---

### EASY

**Q: What is React?**
A: React is a JavaScript library for building user interfaces. It lets you build reusable UI components and efficiently update the DOM when data changes.

**Q: What is a component in React?**
A: A component is a reusable piece of UI. In this project every section is a component — Navbar, Footer, Hero, ProductItem, Title, Searchbar etc.

**Q: What is the difference between a page and a component in this project?**
A: Pages are route-level components like Home, BestSellerPage, LatestCollectionPage, Product. Components are reusable UI pieces like Navbar, Footer, ProductItem that are used inside pages.

**Q: What are props? Give an example from your project.**
A: Props are inputs passed to a component. In ProductItem, we pass `id`, `image`, `name`, and `price` as props from the parent to display each product's data.

**Q: What is JSX?**
A: JSX is a syntax that looks like HTML but is written inside JavaScript. React uses it to describe what the UI should look like. For example `<ProductItem key={index} id={item._id} />` is JSX.

**Q: What is the `key` prop and why is it important?**
A: React uses `key` to identify which items changed in a list. Used in product grids, dot indicators, and size buttons. Without a key React can't efficiently update the list and may cause bugs.

**Q: What is Tailwind CSS?**
A: A utility-first CSS framework where you style elements using predefined class names directly in JSX instead of writing separate CSS files.

**Q: What is the difference between `object-cover` and `object-contain`?**
A: `object-cover` crops the image to fill the container. `object-contain` fits the full image inside the container without cropping. Used `object-contain` so product images are fully visible in the carousel.

**Q: What does `event.preventDefault()` do?**
A: It stops the browser's default behavior. Used in the Newsletter form to prevent the page from reloading when the form is submitted.

**Q: What is the difference between `==` and `===` in JavaScript?**
A: `==` checks value only (loose equality), `===` checks value and type (strict equality). Always use `===` to avoid unexpected type coercion bugs.

---

### MEDIUM

**Q: What is useState? Where did you use it?**
A: useState is a React hook to manage local state. Used in carousels to track `currentIndex`, `sliding`, and `direction`. Used in Collection to track `category`, `subCategory`, `sortType`, `filterProducts`, and `currentPage`. Used in Cart to track `cartData`.

**Q: What is useEffect? Where did you use it?**
A: useEffect runs side effects after render. Used in the carousel to set up a `setInterval` that auto-advances slides and cleans up with `clearInterval`. Used in Collection to re-run `applyFilter` whenever `category`, `subCategory`, or `search` changes. Used in Product to fetch product data when `productId` changes.

**Q: What is useRef? Where did you use it?**
A: useRef holds a mutable value that doesn't cause re-renders. Used to store `timerRef` for the carousel interval so it can be cleared properly without triggering a re-render.

**Q: What is useParams? Where did you use it?**
A: useParams is a React Router hook that reads dynamic URL parameters. Used in Product.jsx to get `productId` from the URL `/product/:productId` and find the matching product from the products array.

**Q: What is useNavigate? Where did you use it?**
A: useNavigate is a React Router hook that lets you navigate programmatically. Used in Searchbar.jsx — when the user types a search and presses Enter or clicks the icon, it navigates to `/collection` to show filtered results.

**Q: What is Context API? Why did you use it?**
A: Context API provides a way to share data across components without prop drilling. Used ShopContext to share `products`, `currency`, `delivery_fee`, `search`, `cartItems`, `addToCart`, and `getCartCount` across all components.

**Q: What is createContext and useContext?**
A: `createContext` creates the context object. `useContext` consumes it inside any component. For example `const { products, currency } = useContext(ShopContext)` is used in ProductItem, Collection, Product etc.

**Q: What is a Context Provider?**
A: The Provider wraps the app and makes the context value available to all children. In this project `ShopContextProvider` wraps the entire app in `main.jsx`.

**Q: What is React Router DOM?**
A: A library for client-side routing in React. It lets you navigate between pages without a full page reload.

**Q: What is the difference between `<Link>` and `window.location.href`?**
A: `<Link>` uses React Router's navigation which is fast and doesn't reload the page. `window.location.href` does a full page reload. Used `window.location.href` for carousel headings because using `<Link>` inside another `<Link>` causes nested `<a>` tags which is invalid HTML.

**Q: What is a dynamic route? Give an example.**
A: A route with a variable segment. `/product/:productId` is a dynamic route where `productId` changes based on which product is clicked. The value is read using `useParams`.

**Q: How did you build the image carousel without any library?**
A: Using `useState` for `currentIndex`, `sliding`, and `direction`. A `setInterval` inside `useEffect` auto-advances the index every 3 seconds. Tailwind CSS classes for `translate-x`, `opacity`, and `scale` handle the animation. The interval is cleared and reset every time `currentIndex` changes to avoid stacking intervals.

**Q: Why did you clear and reset the interval on every slide change?**
A: If you don't clear the old interval when `currentIndex` changes, multiple intervals stack up and the slide speed keeps increasing. Returning `clearInterval` from `useEffect` ensures only one interval runs at a time.

**Q: How did you make the layout responsive?**
A: Used Tailwind's responsive prefixes. For example `flex-col md:flex-row` stacks the two carousels vertically on mobile and side by side on desktop. `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` adjusts the product grid columns based on screen size.

**Q: What is structuredClone? Where did you use it?**
A: `structuredClone` creates a deep copy of an object. Used in `addToCart` in ShopContext to clone `cartItems` before modifying it, so we don't mutate the state directly.

**Q: What is the difference between shallow copy and deep copy?**
A: A shallow copy copies only the top level — nested objects still reference the original. A deep copy copies everything including nested objects. Used `structuredClone` for a deep copy of `cartItems` because it's a nested object `{ itemId: { size: quantity } }`.

**Q: How did you implement filtering in the Collection page?**
A: Using `applyFilter` function that starts with all products, then filters by `category` array if any are selected, then filters by `subCategory` array if any are selected, then filters by `search` using Fuse.js. The `useEffect` re-runs `applyFilter` whenever `category`, `subCategory`, or `search` changes.

**Q: How did you implement sorting?**
A: Using a `sortType` state connected to a select dropdown. The `sortProduct` function sorts `filterProducts` by price ascending or descending using `.sort()`. For the default case it calls `applyFilter` to reset to the filtered order.

**Q: How did you implement pagination?**
A: Using `currentPage` state and `productsPerPage = 16`. Calculate `indexOfFirstProduct` and `indexOfLastProduct` from `currentPage`, then slice `filterProducts` to get `currentProducts`. `totalPages` is calculated using `Math.ceil(filterProducts.length / productsPerPage)`. Clicking a page button updates `currentPage`.

---

### HARD

**Q: What is fuzzy search and how did you implement it?**
A: Fuzzy search finds results even when the user makes typos. Used Fuse.js library with `keys: ['name', 'category', 'subCategory']` and `threshold: 0.4`. Lower threshold means stricter matching. This way searching "tsheirt" still finds "T-shirt".

**Q: What is the cart data structure and why did you choose it?**
A: Cart is stored as a nested object `{ itemId: { size: quantity } }`. For example `{ aaaab: { M: 2, L: 1 } }`. This structure makes it easy to check if an item+size combination exists, increment quantity, and look up items by ID and size in O(1) time.

**Q: How does addToCart work?**
A: First checks if a size is selected — if not shows a toast error. Then deep clones `cartItems` using `structuredClone`. If the item exists in cart, increments the quantity for that size. If not, creates a new entry. Then calls `setCartItems` with the updated cart and shows a success toast.

**Q: How did you calculate the cart item count?**
A: In `getCartCount` in ShopContext, loop through all items in `cartItems` using `for...in`, then loop through all sizes for each item, and add up all quantities. This gives the total number of items across all products and sizes.

**Q: What is the difference between `for...in` and `for...of`?**
A: `for...in` iterates over the keys of an object. `for...of` iterates over the values of an iterable like an array. Used `for...in` in `getCartCount` and `Cart.jsx` because `cartItems` is an object and we need to loop over its keys (item IDs and sizes).

**Q: How did you implement the related products feature?**
A: In `ProductRelated.jsx`, receive `category` and `subCategory` as props from the Product page. In `useEffect`, filter all products to match both the same category and subCategory, take the first 5 results, and save to `related` state. Then render them using `ProductItem`.

**Q: How did you scroll to the top when navigating to a new product from related products?**
A: Added `window.scrollTo(0, 0)` inside the `useEffect` in Product.jsx that runs when `productId` changes. So every time a new product page loads — whether from related products, search, or grid — the page scrolls to the top.

**Q: What is a nested `<a>` tag error and how did you fix it?**
A: HTML does not allow an `<a>` tag inside another `<a>` tag. This happened when wrapping the Title with `<Link>` inside the carousel which already had a `<Link>` around the image. Fixed it by using `onClick` with `window.location.href` on the heading div instead.

**Q: What is the `sliding` state used for in the carousel?**
A: It acts as a debounce lock to prevent the user from clicking next/prev too fast while an animation is still in progress. If `sliding` is true, `goTo` returns early and ignores the click. After 400ms the animation completes and `sliding` is set back to false.

**Q: How did you add the fade animation to ProductItem images?**
A: Added `key={currentImage}` to the `<img>` tag. When the key changes React unmounts and remounts the element, which replays the CSS `animate-fadeIn` animation defined in `index.css` using `@keyframes fadeIn`.

**Q: Why did you use `async` on `fetchProductData` in Product.jsx and is it necessary?**
A: The function was marked `async` but has no `await` inside — so it's unnecessary. The function just loops through the products array synchronously to find the matching product. `async` would only be needed if fetching from an API.

**Q: What is `useLocation` and where was it used?**
A: `useLocation` is a React Router hook that returns the current URL location object. Was used in Searchbar to detect which page the user is on and show/hide the search bar. Later simplified since the search bar is now always visible.

**Q: How does the search redirect work?**
A: In Searchbar.jsx, when the user presses Enter or clicks the search icon, `handleSearch` is called. It checks if `search` is not empty using `.trim()`, then calls `navigate('/collection')`. Since `search` is in ShopContext, the Collection page reads it and `applyFilter` runs automatically because `search` is in its `useEffect` dependency array.

**Q: What is the difference between `filter`, `map`, and `find` in JavaScript?**
A: `filter` returns a new array with all elements that pass a condition. `map` returns a new array by transforming each element. `find` returns the first element that matches a condition. Used `filter` for category/subcategory filtering, `map` for rendering product lists, and products array loop with condition for finding a product by ID.

**Q: Why is a `<p>` inside a `<p>` invalid HTML and what problems can it cause?**
A: The `<p>` tag cannot contain block-level elements including another `<p>`. The browser auto-closes the outer `<p>` which breaks the layout. Found and fixed this in Footer.jsx.

**Q: What is React Toastify and how did you use it?**
A: React Toastify is a library for showing notification messages. Used `toast.error` when no size is selected before adding to cart, and `toast.success` when an item is successfully added. Configured with custom styles for dark background, white text, and rounded corners.

**Q: What is the difference between controlled and uncontrolled components?**
A: A controlled component has its value managed by React state. An uncontrolled component manages its own value via the DOM. In this project the search input and email newsletter input are controlled — their values are tied to state via `value` and `onChange`.

**Q: How would you optimize this project for performance?**
A: Several ways — use `useMemo` to memoize filtered/sorted product lists so they don't recalculate on every render. Use `useCallback` to memoize functions like `addToCart`. Use lazy loading for images. Use `React.memo` on `ProductItem` to prevent unnecessary re-renders when parent state changes.
