import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState("left");
  const bestProducts = products.filter((p) => p.bestseller);
  const timerRef = useRef(null);

  const goTo = (index, dir = "left") => {
    if (sliding) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setSliding(false);
    }, 400);
  };

  const next = () => goTo((currentIndex + 1) % bestProducts.length, "left");
  const prev = () => goTo((currentIndex - 1 + bestProducts.length) % bestProducts.length, "right");

  useEffect(() => {
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  if (bestProducts.length === 0) return null;

  const item = bestProducts[currentIndex];

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl cursor-pointer" onClick={() => window.location.href = '/bestsellers'}>
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our most loved styles, chosen by you
        </p>
      </div>

      {/* carousel */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
        <Link to={`/product/${item._id}`}>
          <img
            src={item.image[0]}
            alt={item.name}
            className={`w-full h-[28rem] object-contain bg-gray-100 transition-all duration-700 ease-in-out ${
              sliding
                ? direction === "left"
                  ? "-translate-x-full opacity-0 scale-105"
                  : "translate-x-full opacity-0 scale-105"
                : "translate-x-0 opacity-100 scale-100"
            }`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-white font-medium text-sm tracking-widest uppercase">{item.name}</p>
            <p className="text-white/70 text-xs mt-1">{currency}{item.price}</p>
          </div>
        </Link>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-300"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-300"
        >
          &#8594;
        </button>

        <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2">
          {bestProducts.map((_, i) => (
            <span
              key={i}
              onClick={() => goTo(i, i > currentIndex ? "left" : "right")}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                i === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
