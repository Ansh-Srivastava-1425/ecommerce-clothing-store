import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ selectedItems = [] }) => {
  const { currency, delivery_fee } = useContext(ShopContext);

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = selectedItems.length > 0 ? delivery_fee : 0;
  const total = subtotal + shipping;

  return (
    <div className="border rounded-xl p-6">
      <div className="text-xl mb-4">
        <Title text1={"ORDER"} text2={"SUMMARY"} />
      </div>

      <div className="flex flex-col gap-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Selected Items</span>
          <span>{selectedItems.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency}{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-500" : ""}>
            {shipping === 0 ? "Free" : `${currency}${shipping}`}
          </span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base text-gray-900">
          <span>Total</span>
          <span>{currency}{total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
