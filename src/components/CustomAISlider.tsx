// "use client";

// import { useRef, useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// interface CustomAISliderProps {
//   isChatOpen: boolean;
//   setIsChatOpen: (isOpen: boolean) => void;
// }

// interface Developer {
//   name: string;
//   experience: string;
//   rate: string;
//   skills: string | string[];
//   image: string;
//   status: string;
//   availability: string;
// }

// interface Logo {
//   logo_name: string;
//   logo_image: string;
// }

// interface Service {
//   weofferheading: string;
//   weofferlearnmore: string;
// }

// interface ServiceHeader {
//   offerheading: string;
//   offersubheading: string;
// }

// export default function DeveloperHiringSection({ isChatOpen, setIsChatOpen }: CustomAISliderProps) {
//   const [data, setData] = useState<{
//     jaiservices: Service[];
//     jaiserviceshead: ServiceHeader[];
//     hiredeveloper: ServiceHeader[];
//     developer: Developer[];
//     logo: Logo[];
//   }>({
//     jaiservices: [],
//     jaiserviceshead: [],
//     hiredeveloper: [],
//     developer: [],
//     logo: []
//   });

//   useEffect(() => {
//     fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL')
//       .then(res => res.json())
//       .then(data => {
//         const customAISlider = data.home.customaislider;

//         // Process skills - some are strings with escaped quotes
//         const processedDevelopers = customAISlider.developer.map((dev: Developer) => ({
//           ...dev,
//           skills: typeof dev.skills === 'string' ?
//             dev.skills.replace(/\\"/g, '').split(', ') :
//             dev.skills
//         }));

//         setData({
//           jaiservices: customAISlider.jaiservices,
//           jaiserviceshead: customAISlider.jaiserviceshead,
//           hiredeveloper: customAISlider.hiredeveloper,
//           developer: processedDevelopers,
//           logo: customAISlider.logo
//         });
//       })
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Services CTA */}
//         {data.jaiserviceshead.length > 0 && (
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
//                 {data.jaiserviceshead[0].offerheading}
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               {data.jaiserviceshead[0].offersubheading}
//             </p>
//           </div>
//         )}

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {data.jaiservices.map((service, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
//               onClick={() => setIsChatOpen(true)}
//             >
//               <h3 className="text-lg font-medium text-gray-800">{service.weofferheading}</h3>
//               <p className="text-sm text-gray-500 mt-2">{service.weofferlearnmore} →</p>
//             </div>
//           ))}
//         </div>

//         {/* Section Header */}
//         {data.hiredeveloper.length > 0 && (
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
//                 {data.hiredeveloper[0].offerheading}
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               {data.hiredeveloper[0].offersubheading}
//             </p>
//           </div>
//         )}

//         {/* Developers Slider Section */}
//         <div className="mb-20">
//           <div className="relative">
//             <Swiper
//               modules={[Autoplay, Pagination]}
//               spaceBetween={20}
//               slidesPerView={1}
//               pagination={{
//                 clickable: true,
//                 el: '.developer-pagination',
//                 type: 'bullets',
//               }}
//               autoplay={{
//                 delay: 2400,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//                 reverseDirection: true,
//               }}
//               loop
//               speed={800}
//               breakpoints={{
//                 480: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 4 },
//                 1024: { slidesPerView: 5 }
//               }}
//             >
//               {data.developer.map((dev, index) => (
//                 <SwiperSlide key={index}>
//                   <DeveloperCard developer={dev} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="developer-pagination mt-6 flex justify-center"></div>
//           </div>
//         </div>

//         {/* Trusted Companies Section */}
//         <div className="text-center">
//           <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by innovative companies worldwide</h3>
//           <div className="p-6 bg-gray-50 rounded-xl">
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={40}
//               slidesPerView={2}
//               autoplay={{
//                 delay: 500,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true
//               }}
//               loop
//               speed={1000}
//               breakpoints={{
//                 480: { slidesPerView: 3 },
//                 640: { slidesPerView: 4 },
//                 768: { slidesPerView: 5 },
//                 1024: { slidesPerView: 6 }
//               }}
//             >
//               {data.logo.map((logo, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="h-16 flex items-center justify-center px-4 opacity-70 hover:opacity-100 transition-opacity">
//                     <img
//                       src={logo.logo_image}
//                       alt={logo.logo_name}
//                       className="h-8 object-contain"
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function DeveloperCard({ developer }: { developer: Developer }) {
//   // Ensure skills is always an array
//   const skillsArray = Array.isArray(developer.skills) ?
//     developer.skills :
//     typeof developer.skills === 'string' ?
//       developer.skills.split(', ') :
//       [];

//   return (
//     <div className="max-w-xs mx-auto rounded-xl shadow-lg overflow-hidden relative" style={{ height: "420px" }}>
//       {/* Full Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={developer.image}
//           alt={developer.name}
//           className="w-full h-full object-cover"
//           style={{
//             objectPosition: 'center center',
//             filter: 'brightness(0.85)'
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
//       </div>

//       {/* Content Container - Bottom Aligned */}
//       <div className="relative z-10 h-full flex flex-col justify-end py-6 px-1">
//         {/* Status Badge */}
//         <div className="self-end mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${developer.status === "Top 3%"
//               ? "bg-purple-500/20 text-purple-100 backdrop-blur-sm border border-purple-400/30"
//               : "bg-white/20 text-white backdrop-blur-sm border border-white/30"
//             }`}>
//             {developer.status}
//           </span>
//         </div>

//         {/* Main Content - Grows Upward */}
//         <div className="bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl">
//           {/* Name + Role */}
//           <div className="mb-3">
//             <h2 className="text-2xl font-bold text-white">{developer.name}</h2>
//           </div>

//           {/* Skills with Commas */}
//           <div className="flex flex-wrap gap-x-2">
//             {skillsArray.map((skill: string, i: number) => (
//               <span key={i} className="inline-flex items-center">
//                 <span className="text-white/90 text-xs">{skill}</span>
//                 {i !== skillsArray.length - 1 && (
//                   <span className="mx-1 text-white/40">,</span>
//                 )}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useParamsContext } from "@/context/PageContext";

interface CustomAISliderProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  slectedItem: string;  // Add this line
}

interface Developer {
  name: string;
  experience: string;
  rate: string;
  skills: string | string[];
  image: string;
  status: string;
  availability: string;
}

interface Logo {
  logo_name: string;
  logo_image: string;
}

interface Service {
  weofferheading: string;
  weofferlearnmore: string;
}

interface ServiceHeader {
  offerheading: string;
  offersubheading: string;
}

export default function CustomAISlider({ isChatOpen, setIsChatOpen }: CustomAISliderProps) {
  const { selectedPage } = useParamsContext();
  const [rawData, setRawData] = useState<any>(null);
  const [sliderData, setSliderData] = useState<{
    jaiservices: Service[];
    jaiserviceshead: ServiceHeader[];
    hiredeveloper: ServiceHeader[];
    developer: Developer[];
    logo: Logo[];
  }>({
    jaiservices: [],
    jaiserviceshead: [],
    hiredeveloper: [],
    developer: [],
    logo: []
  });

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL')
      .then(res => res.json())
      .then(data => {
        setRawData(data);
        updateSliderData(data, selectedPage?.pageName || 'home');
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (rawData) {
      updateSliderData(rawData, selectedPage?.pageName || 'home');
    }
  }, [selectedPage, rawData]);

  const updateSliderData = (data: any, pageName: string) => {
    // Remove leading slash if exists
    const cleanPageName = pageName.startsWith('/') ? pageName.substring(1) : pageName;
    
    // Get the customaislider data for the current page or fallback to home
    const pageData = data[cleanPageName]?.customaislider || data.home?.customaislider;
    
    if (pageData) {
      const processedDevelopers = pageData.developer?.map((dev: Developer) => ({
        ...dev,
        skills: typeof dev.skills === 'string' ?
          dev.skills.replace(/\\"/g, '').split(', ') :
          dev.skills
      })) || [];

      setSliderData({
        jaiservices: pageData.jaiservices || [],
        jaiserviceshead: pageData.jaiserviceshead || [],
        hiredeveloper: pageData.hiredeveloper || [],
        developer: processedDevelopers,
        logo: pageData.logo || []
      });
    }
  };

  // Only render if we have data for the current page
  if (sliderData.jaiservices.length === 0 && 
      sliderData.developer.length === 0 && 
      sliderData.logo.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Services CTA */}
        {sliderData.jaiserviceshead.length > 0 && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
                {sliderData.jaiserviceshead[0].offerheading}
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sliderData.jaiserviceshead[0].offersubheading}
            </p>
          </div>
        )}

        {/* Services Grid */}
        {sliderData.jaiservices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sliderData.jaiservices.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                onClick={() => setIsChatOpen(true)}
              >
                <h3 className="text-lg font-medium text-gray-800">{service.weofferheading}</h3>
                <p className="text-sm text-gray-500 mt-2">{service.weofferlearnmore} →</p>
              </div>
            ))}
          </div>
        )}

        {/* Section Header */}
        {sliderData.hiredeveloper.length > 0 && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
                {sliderData.hiredeveloper[0].offerheading}
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sliderData.hiredeveloper[0].offersubheading}
            </p>
          </div>
        )}

        {/* Developers Slider Section */}
        {sliderData.developer.length > 0 && (
          <div className="mb-20">
            <div className="relative">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  el: '.developer-pagination',
                  type: 'bullets',
                }}
                autoplay={{
                  delay: 2400,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  reverseDirection: true,
                }}
                loop
                speed={800}
                breakpoints={{
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 }
                }}
              >
                {sliderData.developer.map((dev, index) => (
                  <SwiperSlide key={index}>
                    <DeveloperCard developer={dev} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="developer-pagination mt-6 flex justify-center"></div>
            </div>
          </div>
        )}

        {/* Trusted Companies Section */}
        {sliderData.logo.length > 0 && (
          <div className="text-center">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by innovative companies worldwide</h3>
            <div className="p-6 bg-gray-50 rounded-xl">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView={2}
                autoplay={{
                  delay: 500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                loop
                speed={1000}
                breakpoints={{
                  480: { slidesPerView: 3 },
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 }
                }}
              >
                {sliderData.logo.map((logo, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-16 flex items-center justify-center px-4 opacity-70 hover:opacity-100 transition-opacity">
                      <img
                        src={logo.logo_image}
                        alt={logo.logo_name}
                        className="h-8 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DeveloperCard({ developer }: { developer: Developer }) {
  const skillsArray = Array.isArray(developer.skills) ?
    developer.skills :
    typeof developer.skills === 'string' ?
      developer.skills.split(', ') :
      [];

  return (
    <div className="max-w-xs mx-auto rounded-xl shadow-lg overflow-hidden relative" style={{ height: "420px" }}>
      <div className="absolute inset-0 z-0">
        <img
          src={developer.image}
          alt={developer.name}
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
            filter: 'brightness(0.85)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end py-6 px-1">
        <div className="self-end mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${developer.status === "Top 3%"
              ? "bg-purple-500/20 text-purple-100 backdrop-blur-sm border border-purple-400/30"
              : "bg-white/20 text-white backdrop-blur-sm border border-white/30"
            }`}>
            {developer.status}
          </span>
        </div>

        <div className="bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl">
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-white">{developer.name}</h2>
          </div>

          <div className="flex flex-wrap gap-x-2">
            {skillsArray.map((skill: string, i: number) => (
              <span key={i} className="inline-flex items-center">
                <span className="text-white/90 text-xs">{skill}</span>
                {i !== skillsArray.length - 1 && (
                  <span className="mx-1 text-white/40">,</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}