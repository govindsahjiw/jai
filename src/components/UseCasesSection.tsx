// "use client"; // Ensure that this file is treated as a client-side component.

// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
// import { FaExpand } from "react-icons/fa"; // Extend icon
// import "swiper/css";
// import "swiper/css/pagination";

// export default function UseCasesSection() {
//   // Video URLs for the sliders
//   const firstColumnVideos = [
//     "/vid/1.mp4",
//     "/vid/2.mp4",
//     "/vid/3.mp4",
//     "/vid/4.mp4",
//     "/vid/5.mp4",
//     "/vid/6.mp4",
//     "/vid/7.mp4",
//     "/vid/8.mp4",
//     "/vid/6.mp4",
//     "/vid/3.mp4",
//   ];

//   // Image URL for the middle column
//   const middleColumnImage = "/img/large-image.jpg";

//   // State to control the modal
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="bg-gray-50 py-12">
//       <div className="w-full mx-auto p-6">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">Build AI Development</span> Solutions
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Accelerate your AI journey with our custom development services tailored to your business needs
//           </p>
//         </div>

//         {/* 1-Column Layout */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//           <div className="w-full">
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true
//               }}
//               loop
//               speed={800}
//               className="w-full my-swiper"
//               breakpoints={{
//                 440: {
//                   slidesPerView: 3,
//                   centeredSlides: true,
//                 },
//                 640: {
//                   slidesPerView: 5,
//                   centeredSlides: true,
//                 },
//                 768: {
//                   slidesPerView: 7,
//                   centeredSlides: true,
//                 },
//                 1024: {
//                   slidesPerView: 9,
//                   centeredSlides: true,
//                 },
//               }}
//             >
//               {firstColumnVideos.map((video, index) => (
//                 <SwiperSlide key={index}>
//                   {({ isActive }) => (
//                     <div className={`
//               bg-white shadow-lg overflow-hidden 
//               transition-all duration-500 ease-in-out
//               ${isActive ? 'scale-110 z-10 rounded-2xl' : 'scale-90 rounded-lg'}
//               ${isActive ? '' : 'opacity-80'}
//             `}>
//                       <video
//                         src={video}
//                         muted
//                         autoPlay
//                         loop
//                         className="w-full h-60 object-cover"
//                       />
//                     </div>
//                   )}
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>

//         <style jsx global>{`
//   .my-swiper .swiper-slide {
//     transition: transform 500ms ease-in-out, opacity 500ms ease-in-out, border-radius 500ms ease-in-out;
//   }
//   .my-swiper .swiper-slide-active video {
//     border-radius: 1rem; /* Match rounded-2xl */
//   }
// `}</style>

//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { FaExpand } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

interface ApiResponse {
  home: {
    aisolutionsbuild: {
      developmentHeader: string;
      developmentSubheader: string;
      developmentVideos: string[];
    };
  };
}

export default function UseCasesSection() {
  const [data, setData] = useState<ApiResponse | null>(null);
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
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (!data) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="w-full mx-auto p-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
              {data.home.aisolutionsbuild.developmentHeader}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data.home.aisolutionsbuild.developmentSubheader}
          </p>
        </div>

        {/* 1-Column Layout */}
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
              {data.home.aisolutionsbuild.developmentVideos.map((video, index) => (
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
