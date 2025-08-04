'use client';
import { useEffect, useState, useRef, SetStateAction } from "react";
import "animate.css";

function Lokasi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('pawiwahan');
  const [isVisible, setIsVisible] = useState(false);

  const PawiwahanRef = useRef(null);
  const LokasiPawiwahanRef = useRef(null);
  const ResepsiRef = useRef(null);
  const LokasiResepsiRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const refs = [PawiwahanRef, LokasiPawiwahanRef, ResepsiRef, LokasiResepsiRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const openModal = (type: SetStateAction<string>) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="relative mb-20">

  <div className="absolute -bottom-24 -left-20 -z-10 opacity-60">
    <img
      src="/img/pura.png"
      alt="Dekorasi"
      className="w-60 md:w-80 lg:w-100"
    />
  </div>
  {/* Garis Motif Pembatas */}
      {/* Judul Section */}
      <div
        ref={PawiwahanRef}
        className={`${isVisible ? "animate__animated animate__fadeInDown animate__slower" : "opacity-0"}`}
      >
        <p className="text-5xl sm:text-6xl text-[#5f3c2d] pt-18 text-center tangerine-bold">
          Our Wedding Event
        </p>
        <img
    src="/img/line-cok.png"
    alt="Ornamen Pembatas"
    className="mx-auto mt-2 w-52 sm:w-64 md:w-92"
  />
      </div>

      {/* Grid 2 kolom responsif */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mt-16 py-12">
        {/* Kolom Pawiwahan */}
        <div className="flex flex-col items-center text-center lg:ml-50">
          <div
            ref={LokasiPawiwahanRef}
            className={`relative flex flex-col items-center text-center ${
              isVisible ? "animate__animated animate__fadeInLeft animate__slower" : "opacity-0"
            }`}
          >
            {/* Judul dan Waktu */}
            <div className="text-[#5f3c2d]">
              <h2 className="text-4xl sm:text-5xl tangerine-bold mb-2 ">Pawiwahan</h2>
              <div className="flex items-center justify-center">
                <span className="text-5xl viaoda-libre-regular mr-2">27</span>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-lora">Rabu, Agustus 2025</p>
                  <p className="text-base sm:text-lg font-lora">09:00 - 12:00 WITA</p>
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex items-center justify-center text-md sm:text-xl pb-4 mt-2">
              <i className="fa-solid fa-location-dot mr-4 text-[#5f3c2d]"></i>
              <p className="font-lora text-[#5f3c2d]">Banjar Dinas Asah Badung,<br /> Desa Sepang Kelod</p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col items-center gap-4 px-6 pb-6">
              {/* SIMPAN TANGGAL */}
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pawiwahan%20Agung%20%26%20Ayu&dates=20250827T010000Z/20250827T040000Z&details=Pawiwahan%20Agung%20%26%20Ayu&location=Pura%20Dalem%20Sepang%20Kelod&sf=true&output=xml"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block border-t border-black/50 pt-4 text-sm font-medium tracking-widest text-[#5f3c2d] hover:text-[#D7C5AE] transition-all duration-200"
              >
                <span className="flex items-center gap-2 font-lora">
                  SIMPAN TANGGAL
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                    &gt;
                  </span>
                </span>
              </a>

              {/* LOKASI ACARA */}
              <button
                onClick={() => openModal('pawiwahan')}
                className="group inline-block border-t border-black/50 pt-4 text-sm font-medium tracking-widest text-[#5f3c2d] hover:text-[#D7C5AE] transition-all duration-200 cursor-pointer"
              >
                <span className="flex items-center gap-2 font-lora">
                  LOKASI ACARA
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                    &gt;
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>


        {/* Kolom Resepsi */}
        <div className="flex flex-col items-center lg:mr-50">
          <div
            ref={ResepsiRef}
            className={`relative flex flex-col items-center text-center ${
              isVisible ? "animate__animated animate__fadeInRight animate__slower" : "opacity-0"
            }`}
          >
            {/* Judul dan Waktu */}
            <div className="text-[#5f3c2d]">
              <h2 className="text-4xl sm:text-5xl tangerine-bold mb-2">Resepsi Nikah</h2>
              <div className="flex items-center">
                <span className="text-5xl viaoda-libre-regular mr-2">31</span>
                <div className="flex flex-col justify-center text-left">
                  <p className="text-base sm:text-lg font-lora">Minggu, Agustus 2024</p>
                  <p className="text-base sm:text-lg font-lora ">18:00 - 21:00 WITA</p>
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex items-center text-md sm:text-xl pb-4 mt-2">
              <i className="fa-solid fa-location-dot mr-2 text-[#5f3c2d]"></i>
              <p className="text-[#5f3c2d] font-lora">Balai Pertemuan Bhumiku</p>
            </div>

         <div className="flex flex-col items-center gap-4 px-6 pb-6">
              {/* SIMPAN TANGGAL */}
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi%20Agung%20dan%20Ayu&dates=20250831T100000Z/20250831T130000Z&details=Resepsi%20Agung%20%26%20Ayu&location=Balai%20Pertemuan%20Bhumiku&sf=true&output=xml"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block border-t border-black/50 pt-4 text-sm font-medium tracking-widest text-[#5f3c2d] hover:text-[#D7C5AE] transition-all duration-200"
              >
                <span className="flex items-center gap-2 font-lora">
                  SIMPAN TANGGAL
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                    &gt;
                  </span>
                </span>
              </a>

              {/* LOKASI ACARA */}
              <button
                onClick={() => openModal('resepsi')}
                className="group inline-block border-t border-black/50 pt-4 text-sm font-medium tracking-widest text-[#5f3c2d] hover:text-[#D7C5AE] transition-all duration-200 cursor-pointer"
              >
                <span className="flex items-center gap-2 font-lora">
                  LOKASI ACARA
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                    &gt;
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lokasi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Tombol Close */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl cursor-pointer"
            >
              &times;
            </button>

            {/* Judul Modal */}
            <h3 className="text-black text-center text-xl font-bold mb-4">
              {modalType === 'pawiwahan' ? 'Pawiwahan' : 'Resepsi'}
            </h3>

            {/* Google Maps */}
            <iframe
              className="w-full h-64 rounded-lg border border-gray-300"
              src={
                modalType === 'pawiwahan'
                  ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.793359653579!2d114.90664299999999!3d-8.323321499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd18020da5c6d5d%3A0xb8ac36b70291d94f!2sPura%20Dalem%20Sepang%20Kelod!5e0!3m2!1sid!2sid!4v1753531200451!5m2!1sid!2sid"
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.051861539352!2d115.18453329999998!3d-8.686618400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24790509439ab%3A0xa6bff03578513973!2sBalai%20Pertemuan%20Bhumiku!5e0!3m2!1sid!2sid!4v1753531153058!5m2!1sid!2sid"
              }
              loading="lazy"
              allowFullScreen
            ></iframe>

            {/* Tombol Aksi */}
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="bg-[#721414] text-white px-4 py-2 rounded-lg w-1/2 mr-2 hover:bg-[#5b0e0e] cursor-pointer"
              >
                Tutup
              </button>
              <a
                href={
                  modalType === 'pawiwahan'
                    ? "https://maps.app.goo.gl/YY8euLvCm5ofuBiy6"
                    : "https://maps.app.goo.gl/u9XfvWK1xtLNTL4i9"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#721414] text-white px-4 py-2 rounded-lg w-1/2 text-center hover:bg-[#5b0e0e] cursor-pointer"
              >
                Buka Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lokasi;
