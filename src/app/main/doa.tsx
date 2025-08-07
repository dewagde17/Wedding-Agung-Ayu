'use client';

export default function Doa() {
  return (
    <div className="relative mb-8">
      <div
    className="w-full h-[50px] sm:h-[60px] md:h-[70px] bg-repeat-x bg-[length:auto_100%] bg-top"
    style={{
      backgroundImage: "url('/img/border.png')",
    }}
  ></div>
    <div className="flex justify-center py-8">
      
      {/* Gapura Kiri */}
      {/* Bunga Kiri */}
      
      <img
        src="/img/bg-doa.png"
        alt="Bunga Kiris"
        loading="eager"
        className="absolute top-10 -left-8 w-[20vw] min-w-[120px] max-w-[300px] object-contain pointer-events-none scale-x-[-1] -z-2"
      />
      <img
        src="/img/bg-doa.png"
        alt="Bunga Kanan"
        loading="eager"
        className="absolute top-10 -right-8 w-[20vw] min-w-[120px] max-w-[300px] object-contain pointer-events-none -z-2"
      />

      {/* Konten Tengah */}
      <div className="relative z-10 max-w-5xl text-center pt-8 px-8 md:px-12">
        <h1 className="text-[40px] sm:text-6xl xl:text-7xl tangerine-bold text-[#5f3c2d] mb-4 md:mb-10">
          Om Swastyastu
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#5f3c2d] leading-relaxed font-lora px-4 sm:px-8 md:px-16 lg:px-20 xl:px-8">
          Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa,
           dengan penuh sukacita, kami bermaksud menyelenggarakan Resepsi Pernikahan Putra-Putri kami.
        </p>
      </div>
    </div>
    </div>
  );
}

