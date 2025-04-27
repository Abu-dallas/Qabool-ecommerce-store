import { ConnectToDb } from "@/database/connectToDb";
import Product from "@/models/productSchema";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { productId } = await params;
  try {
    await ConnectToDb();
    const newproducts = await Product.findById(productId);
    return new NextResponse(JSON.stringify(newproducts), { status: 200 });
  } catch (error) {
    console.log("[Dynamic_product_backend_error:]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
