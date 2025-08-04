'use client';

import { useState } from 'react';

const images = [
  "/img/galeri1.JPG",
  "/img/galeri2.JPG",
  "/img/galeri3.JPG",
  "/img/galeri4.JPG",
  "/img/galeri5.JPG",
  "/img/galeri6.JPG",
  "/img/galeri7.JPG",
  "/img/galeri8.JPG",
  "/img/galeri9.JPG",
  "/img/galeri10.JPG",
];

// Ganti dengan ID video kamu (bisa dari link: https://www.youtube.com/watch?v=VIDEO_ID)
const YOUTUBE_VIDEO_ID = "8MuPRNPVXYU"; // ganti dengan ID asli

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
      <h1 className="text-5xl sm:text-6xl md:text-7xl text-[#5f3c2d] tangerine-bold text-center">
        Our Gallery
      </h1>
      <img
    src="/img/line-cok.png"
    alt="Ornamen Pembatas"
    className="mx-auto mt-2 mb-8  w-52 sm:w-64 md:w-80"
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
      <div className="columns-2 sm:columns-3 md:columns-4 gap-2 space-y-2 transition-all duration-500 ease-in-out">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            onClick={() => setActiveIndex(index)}
            className="w-full rounded-md cursor-zoom-in hover:opacity-90 transition duration-200"
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
