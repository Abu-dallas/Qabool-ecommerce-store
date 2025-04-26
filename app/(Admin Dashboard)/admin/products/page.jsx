"use client";
import { Edit, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageLoader from "@/Components/constants/PageLoader";

function ManageProducts() {
  const [Loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/get-all-products");
      const data = await res.json();
      setdata(data);
      if (res.ok) {
        setLoading(false);
      }
    } catch (error) {
      console.log("[GET_PRODUCTS_ERROR]", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log(data);
  }, []);

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/product-register/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Product is deleted");
        window.location.href = "/admin/products";
      }
    } catch (error) {
      console.log("[DELETE_FRONDEND_ERROR]", error);
      toast.error("failed to delete, try again");
    }
  };

  const FilterProduct = data.filter(
    (product) =>
      product.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      product.price.toString().includes(SearchQuery.toString())
  );

  return (
    <div className="w-full h-screen py-4 bg-slate-100">
      <div className="flex items-center max-sm:flex-col-reverse justify-between gap-3 mt-6 px-6">
        <span className="w-[250px] max-sm:w-full flex items-center rounded-lg ring-1 ring-slate-400 border-slate-200 ">
          <input
            type="text"
            placeholder="Search Admin"
            className="p-2 w-full outline-none text-slate-700"
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-slate-400 size-8 mx-2" />
        </span>
        <Link
          href="/admin/new-product"
          className="bg-slate-700 text-center p-2 text-slate-100 rounded-lg max-sm:w-full"
        >
          Add Product
        </Link>
      </div>
      <div className="px-6 py-8 font-bold flex justify-center flex-col gap-8">
        <p className="text-slate-700 text-2xl">Products</p>
        <div className="overflow-x-auto">
          {Loading ? (
            <div className="flex items-center justify-center w-full">
              <PageLoader />
            </div>
          ) : (
            <table className="w-full">
              <thead className="text-left border-b-2 border-slate-200">
                <tr>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    S/N
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Image
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Title
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Price
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Category
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {FilterProduct.map((product, index) => (
                  <tr key={index}>
                    <td className="text-sm max-sm:text-sm whitespace-nowrap max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {index + 1}
                    </td>
                    <td className=" max-sm:px-8 whitespace-nowrap max-sm:text-sm">
                      <Image
                        src={product.media[0]}
                        alt="image"
                        height={20}
                        width={20}
                        className="h-8 w-8 rounded-full"
                      />
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {product.title}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {product.price}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {product.category}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 w-28 text-slate-500 font-normal text-left py-2">
                      <span className="flex items-center  gap-6">
                        <Link
                          href={`/admin/products/edit-product/${product._id}`}
                        >
                          <Edit className="text-blue-400 " />
                        </Link>

                        <Trash
                          onClick={() => handleDelete(product._id)}
                          className="text-rose-500"
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
