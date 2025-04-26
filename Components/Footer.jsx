import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="bg-slate-900 flex flex-col md:flex-row max-sm:flex-col-reverse  md:justify-between lg:px-36 gap-4 p-4 px-4 items-start w-full mt-34">
      <div className="flex  flex-col justify-center gap-1.5 w-full">
        <p className="text-blue-500 font-semibold text-xl py-4 mt-4 ">
          Contact Info
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 p-2 rounded-full">
            <Phone className="text-slate-500" />
          </span>

          <p className="text-slate-500  text-sm">+234 8061457556</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 p-2 rounded-full">
            <Mail className="text-slate-500" />
          </span>

          <p className="text-slate-500  text-sm">
            Fatimaibrahimhamza@gmail.com
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 p-2 rounded-full">
            <MapPin className="text-slate-500" />
          </span>

          <p className="text-slate-500  text-sm">
            Tudun Wada Gombe, Gombe State.
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-blue-500 font-semibold text-xl pb-4 mt-8">
          Social Media
        </p>
        <p className="text-sm md:text-md text-slate-500 py-4">
          To encounter our daily social media contents and engage with us, you
          can follow these social media handles and message us for question and
          guides. We are available 24/7 for you, our esteem customers.
        </p>
        <div className="flex gap-5 items-center justify-center">
          <Facebook className="text-slate-500" />
          <Instagram className="text-slate-500" />
          <Twitter className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
