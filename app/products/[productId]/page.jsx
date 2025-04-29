"use client";
import { Loader2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { addToCart } from "@/Components/constants/CartReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

function page({ params }) {
  const { productId } = React.use(params);
  const [ProductsData, setProductsData] = useState();
  const [Loading, setLoading] = useState(true);
  const [Colors, setColors] = useState();
  const [Images, setImages] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (res.ok) {
          setProductsData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Dynamic_products_frontend_error", error);
      }
    };
    fetchData();
  }, []);

  if (Loading) {
    return (
      <div className="flex items-center justify-center w-full h-[90vh]">
        <Loader2 className=" animate-spin w-12 h-12" />
      </div>
    );
  }
  return (
    <div className="w-full h-screen py-4">
      <div className=" w-24 p-4 pb-6">
        <Link href="/" className="text-lg text-slate-800">
          <span className="flex gap-0.5 items-center hover:text-slate-900">
            <ChevronLeft className="h-8 w-8" />
            Back
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="w-full flex flex-col items-center px-4 justify-center">
          <div className=" w-full">
            <Image
              src={Images || ProductsData?.media[0]}
              alt="qabool product image"
              width={2000}
              height={2000}
              className="h-[350px] w-full rounded-lg"
            />
          </div>

          <div className="mt-2 flex gap-1.5 items-center w-full">
            {ProductsData?.media.length > 1 &&
              ProductsData?.media.map((med, index) => (
                <Image
                  onClick={() => setImages(med)}
                  key={index}
                  src={med}
                  alt="qabool media image"
                  width={2000}
                  height={2000}
                  className={`${
                    med === Images
                      ? "w-full h-20 rounded-lg border-cyan-800 border-2"
                      : "w-full h-20 rounded-lg"
                  }`}
                />
              ))}
          </div>
        </div>

        <div className="w-full p-6">
          <p className="text-slate-700 text-md font-semibold mb-0.5">Title:</p>
          <p className="text-xl text-slate-700 font-bold pb-4">
            {ProductsData?.title}
          </p>
          <p className="text-slate-700 text-md font-semibold pb-0.5">Price:</p>
          <p className="pb-4 text-xl font-bold">
            <span className="text-sm text-slate-700 font-normal">₦</span>
            {ProductsData.price}
          </p>
          <p className="text-slate-700 text-md font-semibold mb-0.5 pt-2">
            Discription:
          </p>
          <p className="text-md text-slate-600 mb-6">
            {ProductsData?.description}
          </p>
          <p className="text-slate-700 text-md font-semibold pb-1">
            Choose Color:
          </p>
          <div className="flex items-center gap-2 pb-6">
            {ProductsData?.color?.map((col, index) => (
              <button
                onClick={() => setColors(col)}
                key={index}
                type="button"
                className={`"p-1 w-[65px] text-black  px-2 rounded-lg" ${
                  col === Colors
                    ? " bg-slate-900 rounded-lg text-white"
                    : " border border-black rounded-lg"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
          <div className="w-full flex gap-3">
            <button
              onClick={() => {
                dispatch(addToCart(ProductsData));
              }}
              className="text-lg text-semibold w-full rounded-xl border border-slate-300 p-1 px-1 hover:bg-slate-800 hover:text-slate-50"
            >
              Add to cart
            </button>
            <button className="text-lg text-semibold w-full rounded-xl border border-slate-300 p-1 px-1 hover:bg-slate-800 hover:text-slate-50">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
