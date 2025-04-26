"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { validateEditAdmin } from "@/Components/constants/formikValidate";
import PageLoader from "@/Components/constants/PageLoader";
import FormLoader from "@/Components/constants/FormLoader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import { toast } from "react-hot-toast";
import React from "react";
import Image from "next/image";

function EditAdmin({ params }) {
  const [Loading, setLoading] = useState(false);
  const [formLoading, setformLoading] = useState(false);
  const [Media, setMedia] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState();
  const router = useRouter();

  const { adminId } = React.use(params);

  const formik = useFormik({
    initialValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
    },
    enableReinitialize: true,
    validate: validateEditAdmin,
    onSubmit,
  });
  async function onSubmit(values) {
    setLoading(true);
    const payload = {
      ...values,
      Media,
    };
    try {
      const res = await fetch(`/api/admin-register/${adminId}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Admin Edited Successfully");
        setLoading(false);

        router.push("/admin/manage-admins");
      }
    } catch (error) {
      console.log("Admin_Edit_Frontend_error", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setformLoading(true);
      try {
        const res = await fetch(`/api/admin-register/${adminId}`, {
          method: "GET",
        });
        const data = await res.json();
        setMedia(data.media);
        setname(data.name);
        setemail(data.email);
        setphone(data.phone);

        if (res.ok) {
          setformLoading(false);
        }
      } catch (error) {
        console.log("[FETCH_ADMINID_FRONT_ERROR]", error);
        setformLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (media) => {
    setMedia((Media) => Media.filter((del) => del !== media));
  };

  if (formLoading) {
    return (
      <div className="flex items-center w-full h-[80vh] justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 w-full h-screen pt-6">
      <div className="p-12 max-sm:p-4">
        <p className="text-2xl max-sm:text-lg font-bold text-slate-700">
          Update Admin
        </p>
        <div className="w-[50%] max-md:w-full ">
          <form
            className="w-full mt-5 flex flex-col gap-1"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label className="text-slate-700 text-lg" htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && formik.touched.name ? (
                <span className="text-sm text-rose-700 mt-1">
                  {formik.errors.name}
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="text-slate-700 text-lg" htmlFor="Email">
                Email
              </label>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-sm text-rose-700 mt-1">
                  {formik.errors.email}
                </span>
              ) : (
                ""
              )}
            </div>

            <div>
              <label className="text-slate-700 text-lg" htmlFor="Phone">
                Phone
              </label>
              <input
                type="phone"
                placeholder="Phone Number"
                className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
                {...formik.getFieldProps("phone")}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <span className="text-sm text-rose-700 mt-1">
                  {formik.errors.phone}
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
                        Upload Image
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
                className="text-lg font-semibold flex items-center justify-center bg-slate-700 text-slate-100 w-[200px] max-sm:w-full mt-4 p-1 rounded hover:scale-98"
                type="submit"
              >
                {Loading ? <FormLoader /> : "Update"}
              </button>
              <Link
                href="/admin/manage-admins"
                className="text-lg font-semibold text-center bg-rose-500 text-slate-100 w-[200px] max-sm:w-full mt-4 p-1 rounded hover:scale-98"
              >
                Cancel
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
