"use client";
import React from "react";
import { NavigationLinks, NavLinks, ProductLinks } from "./constants/NavLinks";
import Link from "next/link";
import { Menu, ChevronRight, ChevronDown, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

function Navigationbar() {
  const [Open, setOpen] = useState(false);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClose = () => setIsMenuOpen(false);
  return (
    <nav className="lg:hidden w-full sticky top-0">
      <div className="bg-slate-700 py-3 px-6 flex items-center justify-between text-slate-100 w-full relative">
        <p className="text-2xl py-3 font-bold max-sm:text-2xl">QABOOL ADMIN</p>
        <div className="flex items-center gap-3 justify-between lg:hidden max-sm:hidden ">
          {NavigationLinks.map((item, index) => (
            <div key={index}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "border-slate-50 text-lg font-semibold py-[10px] border-b-5 transition-all ease-linear duration-300"
                    : " py-3 text-md"
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
          <button className="bg-slate-100 text-slate-700 ml-4 p-1 rounded-lg">
            Logout
          </button>
        </div>
        <div className="sm:hidden">
          <Menu className="size-8" onClick={() => setIsMenuOpen(!IsMenuOpen)} />
          <div
            className={`${
              IsMenuOpen
                ? "w-[200px] pb-4 bg-slate-700 absolute top-13 right-1"
                : "hidden"
            }`}
          >
            {NavLinks.map((item, index) => (
              <div
                key={index}
                className={`${
                  pathname === item.href
                    ? "flex py-3 text-slate-700 gap-4 items-center px-6 bg-white"
                    : "flex  py-3 items-center gap-4 px-6"
                }`}
              >
                <Link
                  onClick={handleLinkClose}
                  className="text-md font-semibold"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </div>
            ))}
            <div className="mx-6 my-3">
              <div
                onClick={() => setOpen(!Open)}
                className="flex items-center justify-between"
              >
                <p className="text-md font-semibold">Manage Products</p>
                {Open ? <ChevronDown /> : <ChevronRight />}{" "}
              </div>
              <div
                className={`${Open ? "flex flex-col gap-3 py-2 " : "hidden"}`}
              >
                {ProductLinks.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1 pl-2 pr-1 rounded-2xl hover:text-slate-700 hover:bg-slate-100"
                  >
                    <Link
                      onClick={handleLinkClose}
                      href={product.href}
                      className="text-sm"
                    >
                      {product.title}
                    </Link>
                    <span className="border-2 border-slate-200 size-5 flex items-center justify-center p-1 rounded-full">
                      {product.icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-slate-50 px-6 py-3 ">
              <p className="text-md font-semibold">Settings</p>
              <Settings />
            </div>
            <div className="mx-6  w-[80%]">
              <button
                onClick={signOut}
                className="border-1 border-slate-100 w-full text- py-1 my-2 hover:bg-white hover:text-slate-700 font-semibold rounded-2xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;
