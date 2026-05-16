import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, carousel = false }) => {
  const { currency } = useContext(ShopContext);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!carousel || !image || image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === image.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [image]);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg">
        <img
          key={currentImage}
          className="w-full h-60 object-contain bg-gray-100 hover:scale-110 transition-all duration-500 ease-in-out animate-fadeIn"
          src={image && image[currentImage]}
          alt={name}
        />
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>

      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
