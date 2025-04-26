import { ConnectToDb } from "@/database/connectToDb";
import AdminRegister from "@/models/AdminRegister";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectToDb();
    const allAdmins = await AdminRegister.find();
    return new NextResponse(JSON.stringify(allAdmins), { status: 200 });
  } catch (error) {
    console.log("[GET_ADMINS_ERROR]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
