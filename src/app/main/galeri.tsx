'use client';

import { useState } from 'react';
import Image from 'next/image'

const images = [
  "/img/g1.jpg", // potrait
  "/img/g4.jpg", // landscape
  "/img/g11.jpg",
  "/img/g3.jpg",
  "/img/g19.jpg",
  "/img/g5.jpg",
  "/img/g6.jpg",
  "/img/g7.jpg",
  "/img/g10.jpg",
  "/img/g9.jpg",
  "/img/g13.jpg",
  "/img/g2.jpg",
  "/img/g16.jpg",
  "/img/g17.jpg",
  "/img/g12.jpg",
  "/img/g15.jpg",
  "/img/g18.jpg",
  "/img/g9.jpg",
];


// Ganti dengan ID video kamu (bisa dari link: https://www.youtube.com/watch?v=VIDEO_ID)
const YOUTUBE_VIDEO_ID = "PXDyz2S0TEw"; // ganti dengan ID asli

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="px-4 py-24 mx-auto max-w-7xl ">
      <h1 className="text-5xl lg:text-6xl xl:text-7xl text-[#5f3c2d] tangerine-bold text-center">
        Our Gallery
      </h1>
      <img
        src="/img/line-cok.png"
        alt="Ornamen Pembatas"
        className="mx-auto mt-2 mb-8 w-56 lg:w-64 xl:w-80"
      />

      {/* Video YouTube */}
      <div className="mb-12 w-full max-w-6xl mx-auto aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Masonry-style Images */}
      <div className="columns-2 md:columns-4 gap-2 space-y-2">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            width={500}
            height={500}
            loading="lazy"
            onClick={() => setActiveIndex(index)}
            className="w-full h-auto rounded-md cursor-zoom-in hover:opacity-90 transition duration-200"
          />

        ))}
      </div>

      {/* Modal / Overlay */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/30 hover:bg-black/60 rounded-full px-4 py-1 transition"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 text-white text-4xl bg-black/30 hover:bg-black/60 rounded-full px-3 py-1 transition"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Main Image */}
          <img
            src={images[activeIndex]}
            alt={`Image ${activeIndex + 1}`}
            className="max-w-[90%] max-h-[90%] rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 text-white text-4xl bg-black/30 hover:bg-black/60 rounded-full px-3 py-1 transition"
            aria-label="Next"
          >
            ›
          </button>

          {/* Indicator */}
          <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
