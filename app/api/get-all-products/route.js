import { ConnectToDb } from "@/database/connectToDb";
import Product from "@/models/productSchema";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectToDb();
    const allProducts = await Product.find();
    return new NextResponse(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    console.log("[GET_PRODUCTS_ERROR]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
