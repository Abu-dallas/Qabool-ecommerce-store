import { ConnectToDb } from "@/database/connectToDb";
import Product from "@/models/productSchema";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { productId } = await params;
  try {
    await ConnectToDb();
    console.log(productId);
    await Product.findByIdAndDelete(productId);
    return new NextResponse("Product Deleted sucessfully", { status: 200 });
  } catch (error) {
    console.log("[DELETE_PRODUCTID_BACKED]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { productId } = await params;
  try {
    await ConnectToDb();
    const product = await Product.findById(productId);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("[GET_PRODUCTID_BACKED]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
  const { productId } = await params;
  try {
    await ConnectToDb();
    if (!title || !price || !description || !selectValue || !Media) {
      return new NextResponse("All field are required", { status: 404 });
    }

    const EditedProduct = await Product.findByIdAndUpdate(productId, {
      title,
      description,
      price,
      rating,
      size: Size,
      media: Media,
      color: Colors,
      category: selectValue,
    });

    await EditedProduct.save();
    return new NextResponse("product updated successfully", { status: 201 });
  } catch (error) {
    console.log("[Product_Edit_Backend]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
