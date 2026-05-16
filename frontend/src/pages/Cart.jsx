import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({ _id: items, size: item, quantity: cartItems[items][item] });
        }
      }
    }
    setCartData(tempData);

    // auto select all new items
    const newSelected = {};
    tempData.forEach((item) => {
      const key = `${item._id}_${item.size}`;
      newSelected[key] = selected[key] !== undefined ? selected[key] : true;
    });
    setSelected(newSelected);
  }, [cartItems]);

  const toggleSelect = (id, size) => {
    const key = `${id}_${size}`;
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSelectAll = () => {
    const allSelected = cartData.every((item) => selected[`${item._id}_${item.size}`]);
    const newSelected = {};
    cartData.forEach((item) => {
      newSelected[`${item._id}_${item.size}`] = !allSelected;
    });
    setSelected(newSelected);
  };

  const selectedItems = cartData.filter((item) => selected[`${item._id}_${item.size}`]);
  const allSelected = cartData.length > 0 && cartData.every((item) => selected[`${item._id}_${item.size}`]);

  return (
    <div className="border-t pt-14 min-h-screen">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 w-full">

            {/* Select All */}
            <div className="flex items-center gap-3 pb-3 border-b mb-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 cursor-pointer accent-black"
              />
              <span className="text-sm text-gray-600">Select All ({cartData.length} items)</span>
            </div>

            {cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              const key = `${item._id}_${item.size}`;
              return (
                <div key={index} className={`flex items-center gap-4 py-4 border-b transition-all ${selected[key] ? 'opacity-100' : 'opacity-50'}`}>

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={!!selected[key]}
                    onChange={() => toggleSelect(item._id, item.size)}
                    className="w-4 h-4 cursor-pointer accent-black shrink-0"
                  />

                  {/* Image */}
                  <img src={productData.image[0]} alt={productData.name} className="w-20 h-24 object-contain bg-gray-50 rounded-md shrink-0" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-gray-800 truncate">{productData.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Size: <span className="font-medium text-gray-700">{item.size}</span></p>
                    <p className="text-base font-semibold text-gray-900 mt-1">{currency}{productData.price}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-0 mt-3 border rounded-md w-fit overflow-hidden">
                      <button
                        onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-3 py-1 text-lg font-medium hover:bg-gray-100 transition-all"
                      >-</button>
                      <span className="px-4 py-1 text-sm border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-3 py-1 text-lg font-medium hover:bg-gray-100 transition-all"
                      >+</button>
                    </div>
                  </div>

                  {/* Delete */}
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    alt="delete"
                    className="w-4 sm:w-5 cursor-pointer opacity-50 hover:opacity-100 transition-all shrink-0"
                  />
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="md:w-80 shrink-0">
            <div className="sticky top-20">
              <CartTotal selectedItems={selectedItems.map((item) => ({
                ...item,
                price: products.find((p) => p._id === item._id).price
              }))} />
              <button
                onClick={() => navigate('/place-order')}
                disabled={selectedItems.length === 0}
                className={`w-full mt-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  selectedItems.length > 0
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                PROCEED TO CHECKOUT ({selectedItems.length})
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
