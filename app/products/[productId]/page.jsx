"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

function page({ params }) {
  const { productId } = React.use(params);
  const [ProductsData, setProductsData] = useState();
  const [Loading, setLoading] = useState(true);
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
    <div className="flex w-full h-screen">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="w-full flex items-center px-4 justify-center">
          <Image
            src={ProductsData?.media[0]}
            alt="qabool product image"
            width={2000}
            height={2000}
            className="h-[350px] w-full rounded-lg"
          />
        </div>
        <div className="w-full p-6">
          <p className="text-xl text-slate-700 font-bold pb-4">
            {ProductsData?.title}
          </p>
          <p className="text-md text-slate-600">{ProductsData?.description}</p>
          <div className="flex items-center gap-2 py-6">
            {ProductsData?.color?.map((col, index) => (
              <button
                key={index}
                type="button"
                className="p-1 w-[65px]  px-2 bg-slate-800 rounded-lg text-white"
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
