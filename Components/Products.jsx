import { Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "./constants/CartReducer";
import { useDispatch } from "react-redux";

function Products({ Featured, Data }) {
  const dispatch = useDispatch();
  return (
    <div className="w-full py-4 px-2">
      <p className="text-slate-600 font-semibold text-2xl p-4">New Arrivals</p>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-1 gap-y-8">
        {Data.map((product, index) => (
          <div
            className="bg-white border-1  border-slate-200/75 w-full rounded-xl overflow-hidden"
            key={index}
          >
            <Image
              src={product?.media[0]}
              priority
              alt="Qabool products image"
              width={2000}
              height={2000}
              className="w-full h-[260px]"
            />
            <div className="p-2">
              <p className="text-slate-600 font-bold capitalize px-4">
                {product?.title}
              </p>
              <p className="text-xl font-bold text-slate-700 px-4">
                <span className="text-sm font-normal">NGN</span>{" "}
                {product?.price}
              </p>
              <div className="flex items-center px-4 py-2 gap-1">
                <Star className="h-5 w-5 text-red-500" fill="red" />
                <Star className="h-5 w-5 text-red-500" fill="red" />
                <Star className="h-5 w-5 text-red-500" fill="red" />
                <Star className="h-5 w-5 text-red-500" fill="red" />
                <Star className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex items-center justify-between p-1.5 gap-2">
                <Link
                  href="#"
                  className="text-sm text-semibold rounded border border-slate-300 p-1 px-3 hover:bg-slate-800 hover:text-slate-50"
                >
                  View
                </Link>
                <button
                  onClick={() => {
                    console.log("PRODUCT:", product),
                      dispatch(addToCart(product));
                  }}
                  className="text-sm text-semibold rounded border border-slate-300 p-1 px-1 hover:bg-slate-800 hover:text-slate-50"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="w-full text-right flex p-3">
        <Link
          href="#"
          className="text-md bg-slate-100 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-500 p-1.5"
        >
          View All Products
        </Link>
      </p>
      <div className="w-full pt-12">
        <p className="text-green-600 flex gap-2 items-center bg-green-200 font-semibold text-2xl p-4 py-2 my-3 rounded-xl">
          Top Deals{" "}
          <span>
            <Check className="text-green-600" />
          </span>
        </p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-4 gap-2 gap-y-8">
          {Featured.map((product, index) => (
            <div
              className="bg-white border-1  border-slate-200/75 w-full rounded-xl overflow-hidden"
              key={index}
            >
              <Image
                src={product?.media[0]}
                alt="Qabool products image"
                width={2000}
                height={2000}
                className="w-full h-[260px]"
              />
              <div className="p-2">
                <p className="text-slate-600 font-bold capitalize px-4">
                  {product.title}
                </p>
                <p className="text-xl font-bold text-slate-700 px-4">
                  <span className="text-sm font-normal">NGN</span>{" "}
                  {product.price}
                </p>
                <div className="flex items-center px-4 py-2 gap-1">
                  <Star className="h-5 w-5 text-red-500" fill="red" />
                  <Star className="h-5 w-5 text-red-500" fill="red" />
                  <Star className="h-5 w-5 text-red-500" fill="red" />
                  <Star className="h-5 w-5 text-red-500" fill="red" />
                  <Star className="h-5 w-5 text-red-500" fill="red" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <Link
                    href="#"
                    className="text-sm text-semibold rounded border border-slate-300 p-1 px-3 hover:bg-slate-800 hover:text-slate-50"
                  >
                    View
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-semibold rounded border border-slate-300 p-1 px-3 hover:bg-slate-800 hover:text-slate-50"
                  >
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
