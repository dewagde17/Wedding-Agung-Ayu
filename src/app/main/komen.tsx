"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

interface Message {
  id: string;
  name: string;
  wish: string;
  date: Timestamp;
}

export default function WeddingWishes() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [charRemaining, setCharRemaining] = useState(300);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, "weddingWishes"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(wishes);
    });

    return () => unsubscribe();
  }, []);

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts[0].charAt(0).toUpperCase();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleWishChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWish(e.target.value);
    setCharRemaining(300 - e.target.value.length);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) {
      alert("Nama dan Harapan wajib diisi!");
      return;
    }

    await addDoc(collection(db, "weddingWishes"), {
      name,
      wish,
      date: Timestamp.fromDate(new Date()),
    });

    setName("");
    setWish("");
    setCharRemaining(300);
  };

  return (
    <div className="min-h-screen pt-40 pb-40 px-8 text-white bg-[#875740] relative">
      <img
        src="/img/bgkom.png"
        alt="Bunga Kiri"
        className="absolute top-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] object-contain pointer-events-none opacity-60"
      />
      <img
        src="/img/bgkom-1.png"
        alt="Bunga Kiri"
        className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] object-contain pointer-events-none opacity-60"
      />
      <div className="relative z-10 max-w-2xl mx-auto items-start">

        {/* Form Ucapan */}
        <div className="text-black mb-12 z-5">
          
          <h2 className="text-5xl md:text-6xl tangerine-bold text-center  text-white">Wedding Wishes</h2>
          <img
            src="/img/line-p.png"
            alt="Ornamen Pembatas"
            className="mx-auto w-52 sm:w-64 md:w-80 mb-6 mt-1"
          />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border rounded-md text-white placeholder-white viaoda-libre-regular"
            />
            <textarea
              rows={4}
              placeholder="Tulis harapan kamu"
              maxLength={300}
              value={wish}
              onChange={handleWishChange}
              className="w-full px-4 py-2 border rounded-md text-white placeholder-white viaoda-libre-regular"
            ></textarea>
            <div className="text-right text-sm text-white viaoda-libre-regular">
              Huruf yang Tersisa: {charRemaining}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#3d432b] hover:bg-[#4f5a3a] text-white rounded-md cursor-pointer viaoda-libre-regular"

            >
              Kirim
            </button>
          </form>
        </div>

        {/* Daftar Pesan */}
        <div className="w-full max-w-2xl mx-auto">
  <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
    {messages.length === 0 ? (
      <p className="text-center text-white italic">Silakan masukkan ucapan</p>
    ) : (
      messages.map((message) => (
        <div
          key={message.id}
          className="p-3 bg-gray-100 rounded-md shadow-inner flex items-start space-x-4"
        >
          <div className="w-8 h-8 rounded-full bg-[#875740] text-white flex items-center justify-center text-sm font-bold">
            {getInitials(message.name)}
          </div>
          <div>
            <p className="text-black text-md font-lora">{message.name}</p>
            <p className="text-black/80 text-sm font-lora">{message.wish}</p>
            <p className="text-black/80 text-xs font-lora">
              {new Date(message.date.seconds * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

      </div>
    </div>
  );
}
