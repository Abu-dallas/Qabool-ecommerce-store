import { ConnectToDb } from "@/database/connectToDb";
import AdminRegister from "@/models/AdminRegister";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { adminId } = await params;
  try {
    await ConnectToDb();
    console.log(adminId);
    await AdminRegister.findByIdAndDelete(adminId);
    return new NextResponse("Admin Deleted sucessfully", { status: 200 });
  } catch (error) {
    console.log("[DELETE_ADMINID_BACKED]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { adminId } = await params;
  try {
    await ConnectToDb();
    const Admin = await AdminRegister.findById(adminId);
    return new NextResponse(JSON.stringify(Admin), { status: 200 });
  } catch (error) {
    console.log("[GET_ADMINID_BACKED]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { name, email, phone, Media } = await req.json();
  const { adminId } = await params;
  try {
    await ConnectToDb();
    if (!name || !email || !phone || !Media) {
      return new NextResponse("All field are required", { status: 404 });
    }

    const EditedAdmin = await AdminRegister.findByIdAndUpdate(adminId, {
      name,
      email,
      phone,
      media: Media,
    });

    await EditedAdmin.save();
    return new NextResponse("Admin updated successfully", { status: 201 });
  } catch (error) {
    console.log("[Admin_Edit_Backend]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
