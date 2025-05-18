"use client";
import { useFormik } from "formik";
import { validateProduct } from "@/Components/constants/formikValidate";
import FormLoader from "@/Components/constants/FormLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField, MenuItem } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Plus, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

function NewProduct() {
  const [Loading, setLoading] = useState(false);
  const [selectValue, setselectValue] = useState([]);
  const [Media, setMedia] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Size, setSize] = useState([]);
  const [InputValue, setInputValue] = useState("");
  const [InputValue2, setInputValue2] = useState("");

  const router = useRouter();

  const handleChange = (event) => {
    const values = event.target.value;
    setselectValue(values === "string" ? values.split(",") : values);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      rating: "",
    },
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
      const res = await fetch("/api/product-register", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Product Created");
        setLoading(false);
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error("failed, please try again");
      console.log("Product_Register_Frontend_error", error);
      setLoading(false);
    }
  }

  const handleColor = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setColors([...Colors, e.target.value]);
      e.target.value = "";
    }
  };
  const handleSize = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSize([...Size, e.target.value]);
      e.target.value = "";
    }
  };
  const handleSizeClick = (e) => {
    e.preventDefault();
    setSize([...Size, InputValue]);
    setInputValue("");
  };

  const handleColorClick = (e) => {
    e.preventDefault();
    setColors([...Colors, InputValue2]);
    setInputValue2("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleDelete = (media) => {
    setMedia((Media) => Media.filter((del) => del !== media));
  };

  return (
    <section className="w-full bg-slate-100">
      <div className="m-6">
        <p className="text-2xl font-semibold text-slate-700">Create Product</p>
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
            <div className="w-full flex items-center outline-none border-1 border-slate-300 rounded">
              <input
                type="text"
                placeholder="Size"
                className="text-slate-700 p-2 outline-none w-full"
                onKeyUp={handleSize}
                value={InputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="button" onClick={handleSizeClick}>
                <Plus className="text-slate-700 mx-2" />
              </button>
            </div>

            <div className="flex gap-2 m-2">
              {Size?.map((size, index) => (
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
              <div className="w-full flex items-center outline-none border-1 border-slate-300 rounded">
                <input
                  type="text"
                  placeholder="Color"
                  className="text-slate-700 p-2 outline-none w-full"
                  onKeyUp={handleColor}
                  value={InputValue2}
                  onChange={(e) => setInputValue2(e.target.value)}
                />
                <button type="button" onClick={handleColorClick}>
                  <Plus className="text-slate-700 mx-2" />
                </button>
              </div>

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
            <MenuItem value="bags">Bags</MenuItem>
            <MenuItem value="rings">Rings</MenuItem>
            <MenuItem value="shoes">Shoes</MenuItem>
            <MenuItem value="beeds">Beeds</MenuItem>
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
              {Loading ? <FormLoader /> : "Create"}
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

export default NewProduct;
