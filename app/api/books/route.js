import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET(req) {
    try {
      await connectDB();
      const { searchParams } = new URL(req.url);
      const query = searchParams.get("q");
  
      const filter = query
        ? { name: { $regex: query, $options: "i" } }
        : {};
  
      const allBooks = await Book.find(filter);
      return NextResponse.json({ mes: "Kitablar tapıldı", allBooks }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ mes: "Server xətası", err }, { status: 500 });
    }
  }
  
export async function POST(req) {
    try {
      await connectDB();
      const body = await req.json();
      console.log("POST body:", body);
  
      const newBook = new Book({
        name: body.name,
        price: Number(body.price),
        description: body.description,
        pageCount: Number(body.pageCount),
        category: body.category,
        publishDate: body.publishDate,
        author: body.author,
        language: body.language,
        stockCount: Number(body.stockCount),
      });
  
      await newBook.save();
  
      return NextResponse.json(
        { mes: "Book created successfully", book: newBook },
        { status: 201 }
      );
    } catch (err) {
      console.error("POST ERROR:", err);
      return NextResponse.json(
        { mes: "Internal server error", error: err.message },
        { status: 500 }
      );
    }
  }
  

export async function DELETE(req) {
    try {
      await connectDB();
      const body = await req.json()
      const deletBookById = await Book.findOneAndDelete(body.id);
      return NextResponse.json(
        { mes: "deleted" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json({ mes: "Interinal server", err }, { status: 500 });
    }
  }