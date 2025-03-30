"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Avatar from "../../public/img/avatar.webp";
import { useEffect, useState } from "react";
import { useParamsContext } from "@/context/PageContext";

interface Slide {
  image: string;
  heading: string;
  subheading: string;
}

interface Benefit {
  title: string;
  description: string;
  type?: string;
}

export default function HeroSection({ isChatOpen, setIsChatOpen }: any) {
  const { selectedPage } = useParamsContext();
  const [rawData, setRawData] = useState<any>(null);
  const [heroData, setHeroData] = useState<{ slides: Slide[]; benefits: Benefit[] }>({
    slides: [],
    benefits: []
  });

  useEffect(() => {
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
    )
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
        // Get page name without slash
        const pageKey = selectedPage?.pageName?.replace(/^\//, '') || "home";
        if (data[pageKey] && data[pageKey].herosection) {
          setHeroData(data[pageKey].herosection);
        } else if (data.home && data.home.herosection) {
          setHeroData(data.home.herosection);
        }
      });
  }, []);

  useEffect(() => {
    if (rawData) {
      // Remove slash from page name if it exists
      const pageKey = selectedPage?.pageName?.replace(/^\//, '') || "home";
      if (rawData[pageKey] && rawData[pageKey].herosection) {
        setHeroData(rawData[pageKey].herosection);
      }
    }
  }, [selectedPage, rawData]);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-50">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop
        speed={800}
        className="w-full h-full"
      >
        {heroData.slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black">
                <h1 className="text-xl md:text-3xl font-bold mb-4 animate-slide-up p-2 border-2 border-transparent border-gradient rounded-lg">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-xl animate-slide-up delay-1500 bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
                  {slide.subheading}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Chat Widget */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
        <div className="relative group">
          <Image
            src={Avatar}
            alt="AI Avatar"
            width={120}
            height={120}
            className="rounded-full shadow-xl border-4 border-white/20 group-hover:border-blue-400 transition-all duration-300"
          />
        </div>

        <div
          className="relative rounded-xl p-5 shadow-xl"
          style={{
            background: "linear-gradient(to right, #0061d1d1, #315476c7)"
          }}
        >
          <button
            onClick={() => setIsChatOpen(true, "talk_to_hype")}
            className="cursor-pointer relative z-10 bg-white text-blue-600 px-6 py-2 rounded-full font-medium shadow-md hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <span>Talk To Hype</span>
            <span className="text-lg">🎙</span>
          </button>

          {/* Sound waves */}
          <div className="absolute -bottom-1 left-0 right-0 h-4 flex justify-center gap-1">
            {[3, 5, 7, 5, 3].map((height, i) => (
              <div
                key={i}
                className="w-1 bg-white/80 rounded-full animate-wave"
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Benefits Grid */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {heroData.benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setIsChatOpen(true, benefit.type)}
              className="cursor-pointer bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right CTA Buttons */}
      <div className="absolute right-4 top-4 z-20">
        <div className="flex flex-col gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white">
          <button
            className="text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm whitespace-nowrap"
            style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}
          >
            Schedule 30 Min Call
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap">
            1 Week Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}
