import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET(req) {
  try {
    await connectDB();
    const allBooks = await Book.find();
    return NextResponse.json(
      { mes: "THIS IS GET METOD (USERS)" ,allBooks},
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ mes: "Interinal server", err }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);

    const newBook = new Book({
      name: body.name,
      price: body.price,
    });
    await newBook.save();
    return NextResponse.json(
      { mes: "THIS IS POST METOD (USERS)" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ mes: "Interinal server", err }, { status: 500 });
  }
}
