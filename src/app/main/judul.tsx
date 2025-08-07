"use client";

import { useEffect, useRef, useState } from "react";
import Doa from "@/app/main/doa";
import Pasangan from "@/app/main/pasangan";
import Lokasi from "@/app/main/lokasi";
import Galeri from "@/app/main/galeri";
import Komen from "@/app/main/komen";
import Reservasi from "@/app/main/reservasi";
import Gift from "@/app/main/gift";
import Penutup from "@/app/main/penutup";
import Countdown from "@/app/main/countdown";
import Image from 'next/image'


export default function Home({ triggerPlay }: { triggerPlay: boolean }) {
  const images = [
    "/img/hd3.jpg",
    "/img/hd1.jpg",
    "/img/hd2.jpg",
    "/img/hd4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (triggerPlay) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (triggerPlay) {
        audio
          .play()
          .then(() => setIsPlaying(!audio.paused))
          .catch(() => { });
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [triggerPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-amber-100/80">

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100 z-0" : "opacity-0 z-0"
              }`}
          >
            <Image
              src={img}
              alt={`Slide ${index}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black opacity-60 z-10" />
          </div>


        ))}

        {/* Konten utama */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-4 space-y-2">
          <p className="text-xs sm:text-sm lg:text-base font-lora tracking-widest" style={{ wordSpacing: "0.2rem" }}>
            THE WEDDING OF</p>
          <img src="/img/logo-wed.png" alt="Logo" className="w-16 sm:w-20 lg:w-24" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl allura-regular">
            Agung <span className="text-4xl allura-regular">&amp;</span> Ayu
          </h1>
          <p className="text-xs sm:text-sm lg:text-base font-lora">Minggu, 31 Agustus 2025</p>
        </div>
      </section>

      {/* Audio Control */}
      <div className="fixed bottom-8 right-4 md:right-12 z-50">
        <audio ref={audioRef} src="/music/sjd.mp3" loop />
        <button
          onClick={togglePlay}
          className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 cursor-pointer"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
              <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zM10.5 3.5A.5.5 0 0 1 11 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
              <path d="M10.804 8.5 5.5 11.933V5.067L10.804 8.5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div
          className="absolute inset-0 bg-[url('/img/bg_awan.png')] bg-repeat bg-[length:700px] bg-center opacity-70 -z-10"
        />
        <Doa />
        <Pasangan />
        <Lokasi />
        <Countdown />
        <Galeri />
        <Reservasi />
        <Gift />
        <Komen />
        <Penutup />
      </div>
    </div>
  );
}
