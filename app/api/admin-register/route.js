import { ConnectToDb } from "@/database/connectToDb";
import AdminRegister from "@/models/AdminRegister";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { name, email, phone, password, cpassword, Media } = await req.json();
  try {
    await ConnectToDb();
    if (!name || !email || !phone || !password || !cpassword || !Media) {
      return new NextResponse("All field are required", { status: 404 });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const newRegister = await AdminRegister.create({
      name,
      email,
      phone,
      password: newPassword,
      media: Media,
    });

    await newRegister.save();
    return new NextResponse(JSON.stringify(newRegister), { status: 201 });
  } catch (error) {
    console.log("[Admin_Register_Backend]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
