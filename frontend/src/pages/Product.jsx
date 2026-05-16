import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductRelated from "../components/ProductRelated";

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Prodcut Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* Product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center  gap-1 mt-2">
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item , index)=>(
                 <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''} ` } key={index}>
                  {item}
                 </button>
                ))}
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' >ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery Is Available on This Product.</p>
            <p>Easy Return And Exchange Policy Within 7 Days.</p>
          </div>
        </div>
      </div>
        {/* Description And Review section */}
        <div className='mt-20' >
          <div className='flex' >
              <b className='border px-5 py-3 text-sm' >Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500' >
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptas id cupiditate odio nisi nam ut debitis possimus sunt doloribus. Reiciendis quisquam sapiente dolore repellendus minima delectus accusantium provident possimus corrupti, esse asperiores tenetur consequuntur quo tempore maxime, laboriosam tempora! Delectus sunt praesentium a quo, ab corrupti consequuntur voluptas reprehenderit obcaecati commodi quaerat mollitia, ratione placeat consectetur rerum sed dolorem numquam. Repudiandae ipsa ipsam commodi tempore repellat sed inventore quibusdam blanditiis aperiam! Consequuntur et delectus debitis ad, nulla aut illum possimus dignissimos corrupti sunt quasi rerum architecto molestias quis veniam vero ipsum nobis, dolore fugiat unde tempore voluptatum sit cumque?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam architecto a aperiam quidem tenetur nostrum delectus, molestiae ex ratione reprehenderit odit perferendis sint dolorem vitae velit totam in adipisci fuga quasi consequatur et exercitationem consequuntur! Consectetur harum officiis repudiandae ad repellendus, possimus quisquam alias soluta voluptas minima, doloremque quaerat laudantium laboriosam molestiae provident, vero quo obcaecati. Iure dolore doloremque beatae.</p>
          </div>
        </div>

    {/* display realted product */}

    <ProductRelated category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
 }

export default Product;
 