"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/Components/constants/formikValidate";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import ButtonLoader from "@/Components/constants/ButtonLoader";
import { useState } from "react";

function AdminLogin() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    const Login = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (Login.ok) {
      setLoading(false);
      toast.success("Admin Login");
      router.push("/admin");
    }
    if (!Login.ok) {
      setLoading(false);
      toast.error("Incorrect email or password");
    }
  }

  return (
    <div className="flex items-center bg-slate-100 justify-center w-full h-screen">
      <div className="w-[400px] max-sm:w-full max-sm:mx-4 px-6 py-8 rounded-lg bg-white">
        <p className="text-slate-700 text-3xl font-bold text-center">QABOOL</p>
        <p className="text-slate-700 text-3xl font-bold text-center mb-12">
          Admin Login
        </p>
        <form
          className="w-full flex flex-col gap-2 mt-5"
          onSubmit={formik.handleSubmit}
        >
          <span>
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
              <span className="text-sm text-rose-500">
                {formik.errors.email}
              </span>
            ) : (
              ""
            )}
          </span>
          <span>
            <label className="text-slate-700 text-lg" htmlFor="Password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-sm text-rose-500">
                {formik.errors.password}
              </span>
            ) : (
              ""
            )}
          </span>

          <span className="flex mt-4">
            <button
              disabled={Loading}
              className="text-lg flex items-center justify-center font-semibold bg-slate-700 text-slate-100 w-full mt-4 p-1 py-2 rounded hover:scale-98"
              type="submit"
            >
              {Loading ? <ButtonLoader /> : "Login"}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
