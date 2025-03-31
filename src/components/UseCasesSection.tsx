"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { FaExpand } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { useParamsContext } from "@/context/PageContext";

interface UseCasesData {
  developmentHeader: string;
  developmentSubheader: string;
  developmentVideos: string[];
}

interface UseCasesSectionProps {
  slectedItem: string;  // Add this line
}

export default function UseCasesSection({ slectedItem }: UseCasesSectionProps) {
  const { selectedPage } = useParamsContext();
  const [rawData, setRawData] = useState<any>(null);
  const [useCasesData, setUseCasesData] = useState<UseCasesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setRawData(jsonData);
        updateUseCasesData(jsonData, selectedPage?.pageName || 'home');
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawData) {
      updateUseCasesData(rawData, selectedPage?.pageName || 'home');
    }
  }, [selectedPage, rawData]);

  const updateUseCasesData = (data: any, pageName: string) => {
    // Remove leading slash if exists
    const cleanPageName = pageName.startsWith('/') ? pageName.substring(1) : pageName;
    
    // Get the use cases data for the current page or fallback to home
    const pageData = data[cleanPageName]?.aisolutionsbuild || data.home?.aisolutionsbuild;
    
    if (pageData) {
      setUseCasesData({
        developmentHeader: pageData.developmentHeader,
        developmentSubheader: pageData.developmentSubheader,
        developmentVideos: pageData.developmentVideos || []
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="w-full mx-auto p-6 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="w-full mx-auto p-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!useCasesData) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="w-full mx-auto p-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
              {useCasesData.developmentHeader}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {useCasesData.developmentSubheader}
          </p>
        </div>

        {/* Video Swiper */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop
              speed={800}
              className="w-full my-swiper"
              breakpoints={{
                440: {
                  slidesPerView: 3,
                  centeredSlides: true,
                },
                640: {
                  slidesPerView: 5,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 7,
                  centeredSlides: true,
                },
                1024: {
                  slidesPerView: 9,
                  centeredSlides: true,
                },
              }}
            >
              {useCasesData.developmentVideos.map((video, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div className={`
                      shadow-lg overflow-hidden 
                      transition-all duration-500 ease-in-out
                      ${isActive ? 'scale-110 z-10' : 'scale-90'}
                      ${isActive ? '' : 'opacity-80'}
                    `}>
                      <video
                        src={video}
                        muted
                        autoPlay
                        loop
                        className="w-full h-70 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <style jsx global>{`
          .my-swiper .swiper-slide {
            transition: transform 500ms ease-in-out, opacity 500ms ease-in-out, border-radius 500ms ease-in-out;
          }
          .my-swiper .swiper-slide-active video {
            border-radius: 1rem;
          }
        `}</style>
      </div>
    </div>
  );
}