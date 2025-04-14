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
    <div className="p-6 max-w-6xl mx-auto bg-[#242424] min-h-screen text-white">
      <h1 className="text-center text-4xl font-bold mb-6 text-blue-400">
        📚 My Library
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Kitab adını yaz..."
          className="bg-[#2f2f2f] text-white placeholder-gray-400 border border-gray-600 px-4 py-2 rounded-l-md w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition"
        >
          Axtar
        </button>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {books.map((book) => (
          <div
            key={book._id}
            className="border border-gray-700 p-4 rounded-lg shadow-md bg-[#2c2c2c] relative hover:shadow-lg transition"
          >
            <button
              onClick={() => handleDelete(book._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-lg font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-white mb-2">{book.name}</h2>
            <p className="text-sm text-gray-300 mb-1">🖋 Yazar: {book.author}</p>
            <p className="text-sm text-gray-300 mb-1">
              📖 Səhifə: {book.pageCount}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              💰 Qiymət: {book.price} AZN
            </p>
            <p className="text-sm text-gray-300 mb-1">
              📅 Nəşr tarixi: {book.publishDate}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              🗂 Kateqoriya: {book.category}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              🌐 Dil: {book.language}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              📦 Stok: {book.stockCount}
            </p>
            <p className="text-sm text-gray-400 mt-2 italic">
              📝 {book.description}
            </p>
          </div>
        ))}
      </div>

      {/* Add Book Form */}
      <details className="mb-10 border border-gray-700 rounded p-4 bg-[#2f2f2f]">
        <summary className="text-lg font-medium cursor-pointer text-blue-400 hover:underline">
          ➕ Yeni kitab əlavə et
        </summary>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("name", { required: true })}
              placeholder="Kitab adı"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("author", { required: true })}
              placeholder="Yazar"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("price", { required: true })}
              placeholder="Qiymət"
              type="number"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("pageCount", { required: true })}
              placeholder="Səhifə sayı"
              type="number"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("category", { required: true })}
              placeholder="Kateqoriya"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("publishDate", { required: true })}
              placeholder="Nəşr tarixi"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("language", { required: true })}
              placeholder="Dil"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
            <input
              {...register("stockCount", { required: true })}
              placeholder="Stok sayı"
              type="number"
              className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded"
            />
          </div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Təsvir"
            className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 p-2 rounded w-full min-h-[80px]"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Əlavə et
          </button>
        </form>
      </details>
    </div>
  );
}
