'use client';

import { useEffect, useRef, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2025-08-31T12:00:00Z"); // 19:00 WIB (UTC+7)
  const [isVisible, setIsVisible] = useState(false);
  const countdownRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // agar hanya muncul sekali
      }
    },
    { threshold: 0.5 } // 30% elemen terlihat baru trigger
  );

  if (countdownRef.current) {
    observer.observe(countdownRef.current);
  }

  return () => {
    if (countdownRef.current) {
      observer.unobserve(countdownRef.current);
    }
  };
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
  {/* Hiasan atas */}
  <div className="w-full h-[60px] bg-repeat-x bg-[length:auto_100%] bg-top rotate-180 -mt-14"
    style={{ backgroundImage: "url('/img/border.png')" }}
  ></div>

  {/* Section Countdown */}
  <div className="flex flex-col items-center text-center pt-4 pb-4 bg-[#704D34]">
    {/* Judul */}
    <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 text-white viaoda-libre-regular">Minggu, 31 Agustus 2025</h2>

    {/* Kotak-kotak countdown */}
    <div
    ref={countdownRef} 
    className="flex flex-wrap justify-center items-center gap-3 md:gap-6 viaoda-libre-regular">
      {[
  { label: "Hari", value: timeLeft.days },
  { label: "Jam", value: timeLeft.hours },
  { label: "Menit", value: timeLeft.minutes },
  { label: "Detik", value: timeLeft.seconds },
].map((item, index) => (
  <div
      key={item.label}
      className={`bg-white bg-opacity-70 rounded-xl shadow-md py-5 md:py-8 w-20 md:w-28
        ${isVisible ? "animate__animated animate__fadeInRight" : "opacity-0"}
      `}
      style={{
        animationDelay: `${index * 0.6}s`,
        animationDuration: "3s",
      }}
    >
    <p className="text-xl md:text-2xl lg:text-3xl text-gray-800">{item.value}</p>
    <p className="text-xs md:text-base text-gray-700 mt-1">{item.label}</p>
  </div>
))}
    </div>
  </div>

  {/* Hiasan bawah */}
  <div className="w-full h-[60px] bg-repeat-x bg-[length:auto_100%]"
    style={{ backgroundImage: "url('/img/border.png')" }}
  ></div>
</div>


  );
};

export default Countdown;
