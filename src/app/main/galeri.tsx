'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import 'animate.css';

const images = [
  "/img/g1.jpg",
  "/img/g4.jpg",
  "/img/g11.jpg",
  "/img/g3.jpg",
  "/img/g8.jpg",
  "/img/g5.jpg",
  "/img/g6.jpg",
  "/img/g7.jpg",
  "/img/g10.jpg",
  "/img/g19.jpg",
  "/img/g13.jpg",
  "/img/g2.jpg",
  "/img/g16.jpg",
  "/img/g17.jpg",
  "/img/g12.jpg",
  "/img/g15.jpg",
  "/img/g18.jpg",
  "/img/g9.jpg",
];

const YOUTUBE_VIDEO_ID = "PXDyz2S0TEw";

// Komponen gambar dengan animasi saat muncul di layar
function AnimatedImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // supaya animasi hanya sekali
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className={`transition duration-500 ${isVisible ? 'animate__animated animate__fadeInUp animate__slower' : 'opacity-0'
        }`}
    >
      <Image
        key={index}
        src={src}
        alt={`Gallery ${index}`}
        width={500}
        height={500}
        loading="lazy"
        onClick={onClick}
        className="w-full h-auto rounded-md cursor-zoom-in hover:opacity-90 transition duration-200"
      />
    </div>
  );
}

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
    <section className="px-4 py-24 mx-auto max-w-7xl">
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
          <AnimatedImage
            key={index}
            src={src}
            index={index}
            onClick={() => setActiveIndex(index)}
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
