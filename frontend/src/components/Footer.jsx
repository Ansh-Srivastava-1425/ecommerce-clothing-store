import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link to='/'>
            <img src={assets.logo1} className="mb-5 w-32" alt="" />
            <p className="w-full md:w-2/3 text-gray-600">
              Your destination for trendy and affordable fashion.
            </p>
          </Link>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="aboutus">About Us</Link>
            </li>
            <li>
              <Link to="delivery">Delivery</Link>
            </li>
            <li>
              <Link to="privacypolicy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-234-567-8910</li>
            <li>essence.official@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ essence.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
