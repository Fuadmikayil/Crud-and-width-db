"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.allBooks || []);
    };
    fetchBooks();
  }, []);

  // Add a new book
  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.book) {
        setBooks((prev) => [...prev, result.book]);
        reset();
      } else {
        alert("Xəta baş verdi!");
      }
    } catch (error) {
      alert("Şəbəkə xətası!");
      console.error("POST error:", error);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!confirm("Silmək istədiyinizə əminsiniz?")) return;

    try {
      const res = await fetch("/api/books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (res.ok) {
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } else {
        alert("Silinmə zamanı xəta baş verdi!");
      }
    } catch (error) {
      console.error("DELETE error:", error);
      alert("Şəbəkə xətası!");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/books?q=${searchTerm}`);
      const data = await res.json();
      setBooks(data.allBooks || []);
    } catch (error) {
      alert("Axtarış zamanı xəta baş verdi!");
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8">📚 Library</h1>

      {/* BOOK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow-md relative">
            <button
              onClick={() => handleDelete(book._id)}
              className="absolute top-2 right-2 text-red-600 font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-1">{book.name}</h2>
            <p className="text-sm text-gray-200 mb-1">🖋 {book.author}</p>
            <p className="text-sm text-gray-200 mb-1">📖 {book.pageCount} səhifə</p>
            <p className="text-sm text-gray-200 mb-1">💰 {book.price} AZN</p>
            <p className="text-sm text-gray-200 mb-1">📅 {book.publishDate}</p>
            <p className="text-sm text-gray-200 mb-1">🗂 {book.category}</p>
            <p className="text-sm text-gray-200 mb-1">🌐 {book.language}</p>
            <p className="text-sm text-gray-200 mb-2">📦 Stok: {book.stockCount}</p>
            <p className="text-sm text-gray-300">Kitab Haqqinda melumatlar:{book.description}</p>
          </div>
        ))}
      </div>

      {/* ADD BOOK FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("name", { required: true })} placeholder="Kitab adı" className="border p-2" />
          <input {...register("author", { required: true })} placeholder="Yazar" className="border p-2" />
          <input {...register("price", { required: true })} placeholder="Qiymət" type="number" className="border p-2" />
          <input {...register("pageCount", { required: true })} placeholder="Səhifə sayı" type="number" className="border p-2" />
          <input {...register("category", { required: true })} placeholder="Kateqoriya" className="border p-2" />
          <input {...register("publishDate", { required: true })} placeholder="Nəşr tarixi" className="border p-2" />
          <input {...register("language", { required: true })} placeholder="Dil" className="border p-2" />
          <input {...register("stockCount", { required: true })} placeholder="Stok sayı" type="number" className="border p-2" />
        </div>
        <textarea {...register("description", { required: true })} placeholder="Təsvir" className="border p-2 w-full min-h-[80px]" />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Əlavə et
        </button>
      </form>
      <section className="mt-6 flex gap-2">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Kitab adını yaz.."
    className="border p-2 flex-grow"
  />
  <button
    onClick={handleSearch}
    type="button"
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Axtar
  </button>
</section>

    </div>
  );
}
