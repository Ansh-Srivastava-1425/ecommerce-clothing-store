    import React, { useState } from "react";
    import Title from "../components/Title";
    import CartTotal from "../components/CartTotal";
    import { assets } from "../assets/assets";
    import { useNavigate } from "react-router-dom";

      const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const navigate = useNavigate();
      return (
        <div className="flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4 w-full lg:max-w-[500px]">
            <div className="text-2xl mb-4">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>

            <div className="flex gap-3">
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="First Name" />
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="Last Name" />
            </div>

            <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="email" placeholder="Email Address" />
            <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="Street Address" />

            <div className="flex gap-3">
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="City" />
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="State" />
            </div>

            <div className="flex gap-3">
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="Zip Code" />
              <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="Country" />
            </div>

            <input className="border border-gray-300 rounded py-2 px-4 w-full outline-none" type="text" placeholder="Phone Number" />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:max-w-[400px]">
            <div className="mt-8">
              <CartTotal />
            </div>

            <div className="mt-12">
              <Title text1={"PAYMENT"} text2={"METHOD"} />

              <div className="flex flex-col sm:flex-row gap-3 mt-5">

                {/* Stripe */}
                <div onClick={() => setMethod('stripe')} className={`flex items-center justify-center gap-3 border h-14 px-4 cursor-pointer flex-1 ${method === 'stripe' ? 'border-black' : 'border-gray-300'}`}>
                  <span className={`w-4 h-4 border rounded-full shrink-0 ${method === 'stripe' ? 'bg-green-400' :''}`}></span>
                  <img className="h-5 object-contain" src={assets.stripe_logo} alt="Stripe" />
                </div>

                {/* Razorpay */}
                <div onClick={() => setMethod('razorpay')} className={`flex items-center justify-center gap-3 border h-14 px-4 cursor-pointer flex-1 ${method === 'razorpay' ? 'border-black' : 'border-gray-300'}`}>
                  <span className={`w-4 h-4 border rounded-full shrink-0 ${method === 'razorpay' ? 'bg-green-400' :''}`}></span>
                  <img className="h-5 object-contain" src={assets.razorpay_logo} alt="Razorpay" />
                </div>

                {/* COD */}
                <div onClick={() => setMethod('cod')} className={`flex items-center justify-center gap-3 border h-14 px-4 cursor-pointer flex-1 ${method === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                  <span className={`w-4 h-4 border rounded-full shrink-0 ${method === 'cod' ? 'bg-green-400' :''}`}></span>
                  <span className="text-gray-500 text-sm font-medium whitespace-nowrap">CASH ON DELIVERY</span>
                </div>

              </div>
            </div>

            <button
      onClick={() => navigate('/orders')}
      className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
    >
      PLACE ORDER
    </button>
          </div>

        </div>
      );
    };

    export default PlaceOrder;
