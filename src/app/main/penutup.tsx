import "animate.css";

function Penutup() {

  return (
    <div className="relative w-full">
        <div
    className="w-full h-[50px] sm:h-[60px] md:h-[70px] bg-repeat-x bg-[length:auto_100%] bg-top"
    style={{
      backgroundImage: "url('/img/border.png')",
    }}
  ></div>
  {/* Bunga Kiri */}
<img
  src="/img/bgpen-2.png"
  alt="Bunga Kiri"
  className="absolute bottom-0 left-0 
             w-[50vw] sm:w-[45vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw]
             max-w-[500px] object-contain z-0 pointer-events-none"
/>

{/* Bunga Kanan (Mirror) */}
<img
  src="/img/bgpen-2.png"
  alt="Bunga Kanan"
  className="absolute bottom-0 right-0 
             w-[50vw] sm:w-[45vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw]
             max-w-[500px] object-contain z-0 pointer-events-none scale-x-[-1]"
/>

    <div className="relative text-white flex flex-col justify-center items-center h-full text-center pt-10 pb-40 space-y-2">  
     <p className="text-md md:text-lg lg:text-2xl font-lora-i leading-relaxed text-[#5f3c2d]">
          (Rgveda : X.85.36)
         </p>    
    <p className="text-sm md:text-md lg:text-xl font-lora-i leading-relaxed text-[#5f3c2d] px-8">
      Grbhnāmi te saubhagatvāya hastam,<br />
      Mayā patyā jaradastir yathāsah,<br />
      Bhago aryamā savitā puramdhir,<br />
      Mahyam tvādurgārhapatyāya devāh.
    </p> <br />

        <p className="text-xs md:text-sm lg:text-lg font-lora leading-relaxed text-[#5f3c2d] px-16 sm:px-24 lg:px-40">
          &quot;Dalam sebuah pernikahan kalian disatukan demi sebuah kebahagiaan
          dengan janji hati untuk saling membahagiakan. Bersamaku engkau akan
          hidup selamanya karena Tuhan pasti akan memberikan karunia sebagai
          pelindung dan saksi dalam pernikahan ini. Untuk itulah kalian
          dipersatukan dalam satu keluarga&quot;.
        </p>
         <h1 className="text-[40px] sm:text-6xl xl:text-7xl font-extrabold tangerine-bold text-[#5f3c2d] pt-10">
          Terima Kasih
        </h1>
  </div>
  </div>
       
    );
  }
  
  export default Penutup;
  