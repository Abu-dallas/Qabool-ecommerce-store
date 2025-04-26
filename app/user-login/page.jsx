import React from "react";

function Login() {
  return (
    <div className="flex items-center bg-slate-100 justify-center w-full h-screen">
      <div className="w-[400px] max-sm:w-full max-sm:mx-4 px-6 py-12 rounded-lg bg-white">
        <p className="text-slate-700 text-3xl font-bold text-center mb-6">
          Login
        </p>
        <form className="w-full flex flex-col gap-2 mt-5">
          <span>
            <label className="text-slate-700 text-lg" htmlFor="Email">
              Email
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
            />
          </span>
          <span>
            <label className="text-slate-700 text-lg" htmlFor="Password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 outline-none border-1 border-slate-300 rounded text-slate-700"
            />
          </span>

          <span className="flex mt-4">
            <button
              className="text-lg font-semibold bg-slate-700 text-slate-100 w-full mt-4 p-1 rounded hover:scale-98"
              type="submit"
            >
              Login
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
