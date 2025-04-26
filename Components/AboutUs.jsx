import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function AboutUs() {
  return (
    <div className="w-full p-2">
      <div className=" w-full p-4 border border-slate-100 flex flex-col md:flex-row items-center md:gap-32 justify-between">
        <div className="w-full">
          <p className="text-2xl text-slate-600 font-bold py-3">About Us</p>
          <p className="text-slate-500 text-md">
            Welcome to Qabool, your one-stop destination for exquisite jewelry
            and stylish bags! At Qabool, we are passionate about offering our
            customers the best in quality and design. Our collection of jewelry
            and bags is carefully curated to meet the diverse tastes and
            preferences of fashion-forward individuals. Whether you’re looking
            for something elegant and timeless or trendy and bold, Qabool has
            something for everyone. We pride ourselves on our commitment to
            quality and craftsmanship, ensuring that every piece is made with
            attention to detail and passion. Our goal is to make luxury
            accessible to everyone, so you can enjoy the finer things in life
            without breaking the bank. From statement necklaces to chic
            handbags, we believe that accessories should elevate your style and
            make you feel confident. Thank you for choosing Qabool where style
            meets elegance.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 w-full">
          <p className="text-blue-500 font-semibold text-xl py-4 mt-8">
            Contact Info
          </p>
          <div className="flex items-center gap-4">
            <span className="bg-slate-100 p-2 rounded-full">
              <Phone />
            </span>

            <p className="text-slate-700  text-md">+234 8061457556</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-slate-100 p-2 rounded-full">
              <Mail />
            </span>

            <p className="text-slate-700  text-md">
              Fatimaibrahimhamza@gmail.com
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-slate-100 p-2 rounded-full">
              <MapPin />
            </span>

            <p className="text-slate-700  text-md">
              Tudun Wada Gombe, Gombe State.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
