"use client";
import { Search, Trash, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageLoader from "@/Components/constants/PageLoader";
import { useSession } from "next-auth/react";

function ManageAdmins() {
  const [Loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [SeachQuery, setSeachQuery] = useState("");
  const { data: session } = useSession();

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/get-all-admins");
      const data = await res.json();
      setdata(data);
      if (res.ok) {
        setLoading(false);
      }
    } catch (error) {
      console.log("[GET_ADMINS_ERROR]", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdmins();
    console.log(data);
  }, []);

  const handleDelete = async (adminId) => {
    try {
      const res = await fetch(`/api/admin-register/${adminId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Admin is deleted");
        window.location.href = "/admin/manage-admins";
      }
    } catch (error) {
      console.log("[DELETE_ADMIN_FRONDEND_ERROR]", error);
      toast.error("failed to delete, try again");
    }
  };

  const filterAdmin = data.filter(
    (admin) =>
      admin.name.toLowerCase().includes(SeachQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(SeachQuery.toLowerCase()) ||
      admin.phone.includes(SeachQuery)
  );

  return (
    <div className="w-full h-screen py-4 bg-slate-100">
      <div className="flex gap-2 items-center p-6">
        <Image
          src={session?.user.image || "/globe.svg"}
          alt="Admin image"
          width={100}
          height={100}
          className="h-[60px] w-[60px] rounded-full"
        />
        <span className="flex justify-center flex-col">
          <p className="text-lg font-bold text-slate-600">
            {session?.user.name.toUpperCase()}
          </p>
          <p className="text-md font-semibold text-slate-500">
            {session?.user.email}
          </p>
        </span>
      </div>
      <div className="flex items-center max-sm:flex-col-reverse justify-between gap-3 mt-6 px-6">
        <span className="w-[250px] max-sm:w-full flex items-center rounded-lg ring-1 ring-slate-400 border-slate-200 ">
          <input
            type="text"
            placeholder="Search Admin"
            className="p-2 w-full outline-none text-slate-700"
            value={SeachQuery}
            onChange={(e) => setSeachQuery(e.target.value)}
          />
          <Search className="text-slate-400 size-8 mx-2" />
        </span>
        <Link
          href="/admin/new-admin"
          className="bg-slate-700 text-center p-2 text-slate-100 rounded-lg max-sm:w-full"
        >
          Add Admin
        </Link>
      </div>
      <div className="px-6 py-8 font-bold flex justify-center flex-col gap-8">
        <p className="text-slate-700 text-2xl">Admins</p>
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
                    Names
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Phone
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Email
                  </th>
                  <th className="text-lg max-sm:text-sm max-sm:px-8 font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterAdmin.map((admin, index) => (
                  <tr key={index}>
                    <td className="text-sm max-sm:text-sm whitespace-nowrap max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {index + 1}
                    </td>
                    <td className=" max-sm:px-8 whitespace-nowrap max-sm:text-sm">
                      <Image
                        src={admin.media[0] || "/globe.svg"}
                        alt="image"
                        height={20}
                        width={20}
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {admin.name.toUpperCase()}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {admin.phone}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 text-slate-500 font-normal text-left py-2">
                      {admin.email}
                    </td>
                    <td className="text-sm whitespace-nowrap max-sm:text-sm max-sm:px-8 w-28 text-slate-500 font-normal text-left py-2">
                      <span className="flex items-center  gap-6">
                        <Link
                          href={`/admin/manage-admins/edit-admin/${admin._id}`}
                        >
                          <Edit className="text-blue-400 " />
                        </Link>

                        <Trash
                          onClick={() => handleDelete(admin._id)}
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

export default ManageAdmins;
