import { ConnectToDb } from "@/database/connectToDb";
import Product from "@/models/productSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {
    title,
    price,
    description,
    Size,
    Colors,
    selectValue,
    Media,
    rating,
  } = await req.json();
  try {
    await ConnectToDb();
    if (!title || !price || !description || !selectValue || !Media) {
      return new NextResponse("All field are required", { status: 404 });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      rating,
      size: Size,
      media: Media,
      color: Colors,
      category: selectValue,
    });

    await newProduct.save();
    return new NextResponse("product created successfully", { status: 201 });
  } catch (error) {
    console.log("[Product_Register_Backend]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
