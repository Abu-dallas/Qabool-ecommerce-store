"use client";
import { useFormik } from "formik";
import { validateProduct } from "@/Components/constants/formikValidate";
import FormLoader from "@/Components/constants/FormLoader";
import PageLoader from "@/Components/constants/PageLoader";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField, MenuItem } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

function EditProduct({ params }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState();
  const [rating, setrating] = useState("");

  const [Loading, setLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [selectValue, setselectValue] = useState([]);
  const [Media, setMedia] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Size, setSize] = useState([]);

  const router = useRouter();
  const { productId } = React.use(params);

  const handleChange = (event) => {
    const values = event.target.value;
    setselectValue(values === "string" ? values.split(",") : values);
  };

  const formik = useFormik({
    initialValues: {
      title: title || "",
      description: description || "",
      price: price || "",
      rating: rating || "",
    },
    enableReinitialize: true,
    validate: validateProduct,
    onSubmit,
  });
  async function onSubmit(values) {
    setLoading(true);
    const payload = {
      ...values,
      Media,
      Colors,
      Size,
      selectValue,
    };
    try {
      const res = await fetch(`/api/product-register/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Product Edited");
        setLoading(false);
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error("failed to edit, please try again");
      console.log("Product_Edit_Frontend_error", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product-register/${productId}`, {
          method: "GET",
        });
        const data = await res.json();
        setColors(data.color);
        setSize(data.size);
        setMedia(data.media);
        setselectValue(data.category);
        settitle(data.title);
        setdescription(data.description);
        setprice(data.price);
        setrating(data?.rating);
        if (res.ok) {
          setpageLoading(false);
        }
      } catch (error) {
        console.log("[FETCH_PRODUCTID_ERROR]", error);
        setpageLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleColor = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setColors([...Colors, e.target.value]);
      e.target.value = "";
    }
  };
  const handleSize = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSize([...Size, e.target.value]);
      e.target.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleDelete = (media) => {
    setMedia((Media) => Media.filter((del) => del !== media));
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh] w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <section className="w-full bg-slate-100">
      <div className="m-6">
        <p className="text-2xl font-semibold text-slate-700">Edit Product</p>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mt-5 flex flex-col gap-1"
          onKeyDown={handleKeyDown}
        >
          <div>
            <label className="text-slate-700 text-lg" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              placeholder="Product Title"
              className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
              {...formik.getFieldProps("title")}
            />
            {formik.errors.title && formik.touched.title ? (
              <span className="text-sm text-rose-700 mt-1">
                {formik.errors.title}
              </span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="text-slate-700 text-lg" htmlFor="Size">
              Size
            </label>
            <input
              type="text"
              placeholder="Size"
              className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
              onKeyUp={handleSize}
            />
            <div className="flex gap-2 m-2">
              {Size.map((size, index) => (
                <span
                  key={index}
                  className="bg-blue-200 py-1 px-2 text-center text-blue-500 rounded-lg"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="text-slate-700 text-lg" htmlFor="Color">
                Color
              </label>
              <input
                type="text"
                placeholder="Color"
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
                onKeyUp={handleColor}
              />
              <div className="flex gap-2 m-2">
                {Colors.map((color, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 py-1 px-2 text-center text-blue-500 rounded-lg"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <label className="text-slate-700 text-lg" htmlFor="price">
                price
              </label>
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
                {...formik.getFieldProps("price")}
              />
              {formik.errors.price && formik.touched.price ? (
                <span className="text-sm text-rose-700 mt-1">
                  {formik.errors.price}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="md:w-[300px] mt-1">
              <label htmlFor="rating">Rating</label>
              <select
                {...formik.getFieldProps("rating")}
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
              >
                <option disabled className="text-slate-500">
                  Select Rating
                </option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <TextField
            select
            value={selectValue}
            onChange={handleChange}
            SelectProps={{
              multiple: true,
            }}
            label="Choice Category"
            size="small"
          >
            <MenuItem value="Bags">Bags</MenuItem>
            <MenuItem value="Rings">Rings</MenuItem>
            <MenuItem value="Purses">Purses</MenuItem>
            <MenuItem value="Wallets">Wallets</MenuItem>
            <MenuItem value="Necklace">Necklace</MenuItem>
            <MenuItem value="Earrings">Earrings</MenuItem>
            <MenuItem value="Bracelets">Bracelets</MenuItem>
            <MenuItem value="Anklets">Anklets</MenuItem>
          </TextField>
          <div>
            <label className="text-slate-700 text-lg" htmlFor="description">
              description
            </label>
            <textarea
              rows={3}
              type="text"
              placeholder="Description"
              className="w-full p-2 resize-none outline-none border-1 border-slate-300 rounded text-slate-700"
              {...formik.getFieldProps("description")}
            />
            {formik.errors.description && formik.touched.description ? (
              <span className="text-sm text-rose-700 mt-1">
                {formik.errors.description}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2">
            <CldUploadWidget
              uploadPreset="qaboolecommerce"
              onSuccess={(results) => {
                setMedia((media) => [...media, results?.info?.url]);
              }}
            >
              {({ open }) => {
                return (
                  <div className="flex gap-1 items-center rounded-lg p-2 justify-center bg-gradient-to-r w-38 bg-cyan-700 to-blue-400">
                    <Upload className="text-white size-4" />
                    <button
                      className=" text-white font-semibold"
                      size="small"
                      color="secondary"
                      onClick={() => open()}
                      type="button"
                    >
                      Upload Images
                    </button>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="flex gap-2 mt-2">
            {Media.map((media, index) => (
              <span key={index} className="relative">
                <Image
                  src={media}
                  alt="images"
                  width={100}
                  height={100}
                  className="w-24 h-18"
                />
                <X
                  className="h-4 w-4 bg-rose-300 rounded-full text-red-600 absolute top-0.5 right-0.5"
                  onClick={() => handleDelete(media)}
                />
              </span>
            ))}
          </div>

          <span className="flex gap-3">
            <button
              className="text-lg flex items-center justify-center font-semibold bg-slate-700 text-slate-100 w-[200px] max-sm:w-full mt-4 p-1 rounded hover:scale-98"
              type="submit"
            >
              {Loading ? <FormLoader /> : "Update"}
            </button>
            <Link
              href="/admin/products"
              className="text-lg font-semibold text-center bg-rose-500 text-slate-100 w-[200px] max-sm:w-full mt-4 p-1 rounded hover:scale-98"
            >
              Cancel
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}

export default EditProduct;
