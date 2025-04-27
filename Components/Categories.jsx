"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Categories({ setSearch }) {
  const [search, setSearching] = useState("");
  return (
    <div className=" mt-4">
      <div className="flex items-center justify-center whitespace-nowrap max-sm:pl-44 pr-3 gap-4 lg:gap-12 scrollbar-hide  overflow-x-auto py-4">
        <div className="flex rounded-full flex-col items-center justify-center">
          <Image
            src="/qabool/bag2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Bags</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/purse2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Purses</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/wallet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">wallets</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/necklace2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Necklace</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/earring2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">I earrings</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/ring2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Rings</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/bracelet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Bracelet</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/qabool/anklet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Anklets</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center px-6  pt-3 pb-6">
        <div className="w-full lg:w-[50%] border flex items-center shadow-xs justify-between pr-3 border-slate-200 rounded-xl">
          <input
            onChange={(e) => {
              setSearch(search), setSearching(e.target.value);
            }}
            type="text"
            placeholder="search product"
            className="p-2 outline-none max-md:w-full w-[35%] px-4 text-slate-600 flex-1"
          />
          <span>
            <Search className="text-slate-500 h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Categories;
