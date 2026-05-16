import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const BestSellerPage = () => {
  const { products } = useContext(ShopContext);
  const bestSellers = products.filter((p) => p.bestseller);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our most loved styles, chosen by you
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellerPage;
