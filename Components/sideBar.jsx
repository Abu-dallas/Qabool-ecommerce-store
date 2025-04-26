"use client";
import Link from "next/link";
import React from "react";
import { NavLinks, ProductLinks } from "./constants/NavLinks";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function SideBar() {
  const [Open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative max-lg:hidden max-lg:w-[220px] bg-slate-700 min-w-[250px] h-screen">
      <div>
        <p className="py-6 text-center text-2xl text-slate-200 font-bold">
          QABOOL ADMIN
        </p>
        <div className="flex flex-col  mt-3 text-slate-50">
          {NavLinks.map((item, index) => (
            <div
              key={index}
              className={`${
                pathname === item.href
                  ? "flex py-3 text-slate-700 gap-4 items-center px-6 bg-white"
                  : "flex  py-3 items-center gap-4 px-6"
              }`}
            >
              <span>{item.icon}</span>
              <Link className="text-lg font-semibold" href={item.href}>
                {item.title}
              </Link>
            </div>
          ))}
          <div className="mx-6 my-3">
            <div
              onClick={() => setOpen(!Open)}
              className="flex items-center justify-between"
            >
              <p className="text-lg font-semibold">Manage Products</p>
              {Open ? <ChevronDown /> : <ChevronRight />}{" "}
            </div>
            <div className={`${Open ? "flex flex-col gap-2 py-2 " : "hidden"}`}>
              {ProductLinks.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1 pl-3 pr-1 rounded-2xl hover:text-slate-700 hover:bg-slate-100"
                >
                  <Link href={product.href} className="font-semibold">
                    {product.title}
                  </Link>
                  <span className="border-2 border-slate-200 size-6 flex items-center justify-center p-1 rounded-full">
                    {product.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-slate-50 px-6 py-3 ">
          <p className="text-lg font-semibold">Settings</p>
          <Settings />
        </div>
        <div className="mx-6 absolute bottom-12 w-[80%]">
          <button onClick={signOut} className="bg-slate-100 w-full py-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
