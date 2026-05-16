import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size", {
        position: "top-center",
        autoClose: 1800,
        style: {
          background: "#111827",
          color: "#fff",
          borderRadius: "12px",
          padding: "14px",
        },
      });

      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success('🛒 Added to cart', {
    position: "top-center",
    autoClose: 1800,
    style: {
      background: "#111827",
      color: "#fff",
      borderRadius: "12px",
      padding: "14px",
    },
})
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

 
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId][size];
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
