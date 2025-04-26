"use client";
import AboutUs from "@/Components/AboutUs";
import Categories from "@/Components/Categories";
import Footer from "@/Components/Footer";
import Products from "@/Components/Products";
import { ChevronLeft, Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/Components/constants/CartReducer";

export default function Home() {
  const images = ["/qaboolbg2.jpg", "/qaboolbg1.jpg", "/qaboolbg3.jpg"];
  const [Index, setIndex] = useState(0);
  const [Open, setOpen] = useState(false);

  const [Data, setData] = useState([]);
  const [Featured, setFeatured] = useState([]);
  const [Loading, setLoading] = useState(true);

  const CartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((imageindex) =>
        imageindex === images.length - 1 ? 0 : imageindex + 1
      );
    }, 4000);

    return () => {
      clearInterval(slider);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/store/get-products");
      const data = await res.json();
      if (res.ok) {
        setData(data);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/store/featured-products");
      const data = await res.json();
      if (res.ok) {
        setFeatured(data);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (Loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center h-[90vh]">
          <Image
            priority
            src="/qabool.png"
            width={2000}
            height={2000}
            alt="qabool logo"
            className="w-34 h-34 animate-ping "
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 bg-white z-10">
        <div className=" px-2 md:px-6 flex items-center relative  justify-between">
          <Image
            src="/qabool.png"
            width={2000}
            height={2000}
            alt="Qabool Logo"
            className="w-24 h-20"
          />
          <div className="flex items-center justify-center gap-2">
            <span
              onClick={(e) => {
                setOpen(true);
              }}
              className="p-1 rounded-lg  hover:bg-slate-800 border-1 border-slate-200 hover:text-white flex items-center justify-center gap-2"
            >
              <ShoppingCart />
              <p className="text-md text-red-400 font-semibold">
                {CartItems.length}
              </p>
            </span>
            <span className="p-1 rounded-lg  hover:bg-slate-800 border-1 border-slate-200 hover:text-white flex items-center justify-center gap-2">
              <Heart />
              <p className="text-md font-semibold">Wishlist</p>
            </span>
          </div>
        </div>
      </div>

      <div className={`${Open ? "h-24 sticky top-0 right-0 z-10 -mt-22" : ""}`}>
        <div
          className={` transition-all duration-700 ease-in-out  z-10 ${
            Open
              ? "w-[97%] max-sm:w-full bg-slate-50 p-4 opacity-100 absolute overflow-y-scroll h-screen  md:w-[75%] top-0 right-0 pointer-events-auto"
              : "w-[97%] bg-slate-50 p-4 opacity-0 absolute  md:w-[75%] top-0 right-0 pointer-events-none"
          }`}
        >
          <div className="sticky top-0 min-h-screen overflow-y-auto z-20">
            <div className="w-full flex items-center justify-between p-2 px-0.5">
              <p
                onClick={() => setOpen(!Open)}
                className="text-lg text-slate-800 w-24"
              >
                <span className="flex gap-0.5 items-center">
                  <ChevronLeft />
                  Back
                </span>
              </p>
              <button
                onClick={() => dispatch(clearCart())}
                type="button"
                className="bg-red-100 p-1 px-2 rounded-md text-red-500 hover:bg-red-300"
              >
                clear cart
              </button>
            </div>
            <div className="w-full min-h-screen p-4 px-0">
              <table className="w-full">
                <thead className="w-full">
                  <tr>
                    <td className="py-6 text-lg text-slate-700 font-semibold px-1">
                      Image
                    </td>
                    <td className="py-6 text-lg text-slate-700 font-semibold px-1">
                      Name
                    </td>
                    <td className="py-6 text-lg  text-slate-700 font-semibold px-1">
                      Price
                    </td>
                    <td className="py-6 pl-10 lg:pl-50 sm:pl-14 text-lg text-slate-700 font-semibold px-1">
                      Qnt
                    </td>
                    <td className="py-6 text-lg text-slate-700 font-semibold px-1">
                      Total
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {CartItems.length > 0 ? (
                    CartItems?.map((item, index) => (
                      <tr
                        key={index}
                        className=" odd:bg-white even:bg-slate-100"
                      >
                        <td className="pl-2">
                          {item?.media?.[0] ? (
                            <Image
                              src={item.media[0]}
                              width={2000}
                              height={2000}
                              alt="images qabool"
                              className="w-9 h-9 rounded-full"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">
                                No Image
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="text-md capitalize py-4">
                          {item?.title}
                        </td>
                        <td className="text-md capitalize py-4 pl-1">
                          {item?.price}
                        </td>
                        <td className="text-md capitalize py-4 pl-3">
                          <div className="flex gap-2 items-center justify-center">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item))}
                              type="button"
                              className="text-slate-700 font-bold p-1 px-2.5 hover:bg-slate-300 bg-slate-200"
                            >
                              -
                            </button>

                            <span>{item?.quantity}</span>
                            <button
                              onClick={() => dispatch(increaseQantity(item))}
                              type="button"
                              className="text-slate-700 font-bold p-1 px-2 hover:bg-slate-300 bg-slate-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-md capitalize py-4 font-bold pl-3 pr-2">
                          <div className="flex gap-2">
                            <p>{item?.quantity * item?.price}</p>
                            <span
                              onClick={() => dispatch(removeFromCart(item))}
                              className="rounded-full p-0.5 bg-red-300 flex items-center justify-center"
                            >
                              <X className="text-red-400 h-5 w-5" />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="w-full">
                      <td colSpan={5}>
                        <p className="text-center py-20 text-2xl">
                          Cart is empty
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex items-center justify-end py-6 px-2">
                <p className="flex gap-3 items-center">
                  <span className="text-xl font-semibold">Grand Total:</span>
                  <span className="text-xl  font-bold">
                    <span className="text-sm font-normal">NGN</span>{" "}
                    {totalPrice}
                  </span>
                </p>
              </div>
              <div className="w-full flex items-center justify-center gap-3 mt-12 max-sm:flex-col">
                <button
                  type="button"
                  className="bg-blue-500 w-56 p-2 rounded-lg text-slate-50 hover:bg-blue-400 font-semibold"
                >
                  pay using bank transfer
                </button>
                <button
                  type="button"
                  className="bg-blue-500 w-56 p-2 rounded-lg text-slate-50 hover:bg-blue-400 font-semibold"
                >
                  pay using bank card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative  w-full h-[350px] lg:h-[500px] overflow-hidden">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            width={2000}
            height={2000}
            alt={`Slide ${i}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              i === Index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div>
        <Categories />
      </div>
      <div>
        <Products Featured={Featured} Data={Data} />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

/*const  = [
  {
    title: "sallah fashion",
    image: "/qabool/ring1.jpg",
    unitPrice: 1200,
    totalPrice: 2500,
    quantity: 2,
  },
  {
    title: "dankunne mai tsada",
    image: "/qabool/earring2.jpg",
    unitPrice: 100,
    totalPrice: 3500,
    quantity: 5,
  },
  {
    title: "hand bag",
    image: "/qabool/bag2.jpg",
    unitPrice: 1200,
    totalPrice: 8500,
    quantity: 3,
  },
  {
    title: "dankunne mai tsada",
    image: "/qabool/earring2.jpg",
    unitPrice: 100,
    totalPrice: 3500,
    quantity: 5,
  },
]; */
