import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET(req,{params}) {
  try {
    const {id} = await params
    await connectDB();
    const findBookById = await Book.findById(id);
    return NextResponse.json(
      { mes: "THIS IS GET METOD (USERS)",findBookById },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ mes: "Interinal server", err }, { status: 500 });
  }
}