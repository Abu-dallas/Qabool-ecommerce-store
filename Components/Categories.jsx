"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Categories({ setSearch }) {
  const [search, setSearching] = useState("");
  return (
    <div className=" mt-4">
      <div className="flex items-center justify-center whitespace-nowrap max-sm:pl-74 pr-3 gap-4 lg:gap-12 scrollbar-hide  overflow-x-auto py-4">
        <button
          onClick={() => setSearch("")}
          className="flex rounded-full flex-col items-center justify-center"
        >
          <Image
            src="/qabool.png"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-20 h-14 rounded-full"
          />
          <p className="text-slate-400 px-3 font-semibold">All</p>
        </button>
        <button
          onClick={() => setSearch("Bags")}
          className="flex rounded-full flex-col items-center justify-center"
        >
          <Image
            src="/qabool/bag2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Bags</p>
        </button>
        <button
          onClick={() => setSearch("Purses")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/purse2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 px-2 font-semibold">Purses</p>
        </button>
        <button
          onClick={() => setSearch("Wallets")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/wallet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">wallets</p>
        </button>
        <button
          onClick={() => setSearch("Necklace")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/necklace2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Necklace</p>
        </button>
        <button
          onClick={() => setSearch("Earrings")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/earring2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">I earrings</p>
        </button>
        <button
          onClick={() => setSearch("Rings")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/ring2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 px-2 font-semibold">Rings</p>
        </button>
        <button
          onClick={() => setSearch("Bracelets")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/bracelet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Bracelets</p>
        </button>
        <button
          onClick={() => setSearch("Anklets")}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/qabool/anklet2.jpg"
            alt="qabool men category"
            width={2000}
            height={2000}
            className="w-14 h-14 rounded-full"
          />
          <p className="text-slate-400 font-semibold">Anklets</p>
        </button>
      </div>
      <div className="w-full flex items-center justify-center px-6  pt-3 pb-6">
        <div className="w-full lg:w-[50%] border flex items-center shadow-xs justify-between pr-3 border-slate-200 rounded-xl">
          <input
            onChange={(e) => {
              setSearch(search), setSearching(e.target.value);
            }}
            value={search}
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
