
// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// interface UseCasesData {
//   developmentHeader: string;
//   developmentSubheader: string;
//   developmentVideos: string[];
// }

// interface UseCasesSectionProps {
//   useCasesData?: UseCasesData;
//   isChatOpen: boolean;
//   setIsChatOpen: (isOpen: boolean, conversationType?: string) => void;
// }

// export default function UseCasesSection({ 
//   useCasesData, 
//   isChatOpen, 
//   setIsChatOpen 
// }: UseCasesSectionProps) {
//   if (!useCasesData || useCasesData.developmentVideos.length === 0) return null;

//   // Mapping of video URLs to conversation types (using snake_case)
//   const videoToConversationMap: Record<string, string> = {
//     "/vid/1.mp4": "video_1",
//     "/vid/2.mp4": "video_2",
//     "/vid/3.mp4": "video_3",
//     "/vid/4.mp4": "video_4",
//     "/vid/5.mp4": "video_5",
//     "/vid/6.mp4": "video_6",
//   };

//   const handleVideoClick = (videoUrl: string) => {
//     const conversationType = videoToConversationMap[videoUrl] || "general";
//     setIsChatOpen(true, conversationType);
//   };

//   return (
//     <div className="bg-gray-50 py-12">
//       <div className="w-full mx-auto p-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             {useCasesData.developmentHeader}
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             {useCasesData.developmentSubheader}
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//           <div className="w-full">
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               autoplay={{ delay: 2500 }}
//               loop
//               speed={800}
//               className="w-full my-swiper"
//               breakpoints={{
//                 440: { slidesPerView: 3, centeredSlides: true },
//                 640: { slidesPerView: 5, centeredSlides: true },
//                 768: { slidesPerView: 7, centeredSlides: true },
//                 1024: { slidesPerView: 9, centeredSlides: true },
//               }}
//             >
//               {useCasesData.developmentVideos.map((video, index) => (
//                 <SwiperSlide key={index}>
//                   {({ isActive }) => (
//                     <div
//                       className={`shadow-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
//                         isActive ? "scale-110 z-10" : "scale-90 opacity-80"
//                       }`}
//                       onClick={() => handleVideoClick(video)}
//                     >
//                       <video
//                         src={video}
//                         muted
//                         autoPlay
//                         loop
//                         className="w-full h-70 object-cover rounded-lg"
//                       />
//                     </div>
//                   )}
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/////usecase
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface UseCasesData {
  developmentHeader: string;
  developmentSubheader: string;
  developmentVideos: string[];
}

interface UseCasesSectionProps {
  useCasesData?: UseCasesData;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean, conversationType?: string) => void;
}

export default function UseCasesSection({ 
  useCasesData, 
  isChatOpen, 
  setIsChatOpen 
}: UseCasesSectionProps) {
  if (!useCasesData || useCasesData.developmentVideos.length === 0) return null;

  // Mapping of video URLs to conversation types (using snake_case)
  const videoToConversationMap: Record<string, string> = {
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/1.mp4": "video_1",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/2.mp4": "video_2",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/3.mp4": "video_3",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/4.mp4": "video_4",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/5.mp4": "video_5",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/6.mp4": "video_6",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/7.mp4": "video_7",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/8.mp4": "video_8",
    "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/9.mp4": "video_9",
  };

  const handleVideoClick = (videoUrl: string) => {
    const conversationType = videoToConversationMap[videoUrl] || "general";
    setIsChatOpen(true, conversationType);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="w-full mx-auto p-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {useCasesData.developmentHeader}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {useCasesData.developmentSubheader}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 2500 }}
              loop
              speed={800}
              className="w-full my-swiper"
              breakpoints={{
                440: { slidesPerView: 3, centeredSlides: true },
                640: { slidesPerView: 5, centeredSlides: true },
                768: { slidesPerView: 7, centeredSlides: true },
                1024: { slidesPerView: 9, centeredSlides: true },
              }}
            >
              {useCasesData.developmentVideos.map((video, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={`shadow-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                        isActive ? "scale-110 z-10" : "scale-90 opacity-80"
                      }`}
                      onClick={() => handleVideoClick(video)}
                    >
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
      </div>
    </div>
  );
}

