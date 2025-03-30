
// "use client";

// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";

// interface CategoryData {
//   image: string;
//   title: string;
//   desc: string;
//   learnMore: string;
// }

// interface HealthcareSectionProps {
//   isChatOpen: boolean;
//   setIsChatOpen: (isOpen: boolean) => void;
// }

// const HealthcareSection = ({ isChatOpen, setIsChatOpen }: HealthcareSectionProps) => {
//   const [activeCategory, setActiveCategory] = useState<string>("");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [data, setData] = useState<{
//     header: string;
//     subheader: string;
//     categories: Record<string, CategoryData[]>;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.home?.applicationstype) {
//           setData(result.home.applicationstype);
//           const categoryKeys = Object.keys(result.home.applicationstype.categories);
//           setCategories(categoryKeys);
//           setActiveCategory(categoryKeys[0] || "");
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="max-w-6xl mx-auto p-6 text-center">Loading AI applications...</div>;
//   }

//   if (error) {
//     return <div className="max-w-6xl mx-auto p-6 text-center text-red-500">{error}</div>;
//   }

//   if (!data) {
//     return <div className="max-w-6xl mx-auto p-6 text-center">No data available</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Heading */}
//       <div className="text-center mb-16 pt-12">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
//             {data.header}
//           </span>
//         </h2>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           {data.subheader}
//         </p>
//       </div>
      
//       {categories.length > 0 && (
//         <>
//           <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
//                   activeCategory === category
//                     ? "bg-blue-500 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <Swiper
//             modules={[Pagination]}
//             spaceBetween={20}
//             slidesPerView={1}
//             pagination={{ clickable: true }}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 }
//             }}
//             className="w-full"
//           >
//             {data.categories[activeCategory]?.map((item, index) => (
//               <SwiperSlide key={index} className="pb-4">
//                 <div className="h-full p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow flex flex-col">
//                   <img 
//                     src={item.image} 
//                     className="w-full h-48 object-cover rounded-t-lg" 
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = '/img/placeholder.jpg';
//                     }}
//                   />
//                   <div className="p-4 flex-1 flex flex-col">
//                     <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                     <p className="text-sm text-gray-600 flex-1">{item.desc}</p>
//                     <button
//                       onClick={() => setIsChatOpen(true)}
//                       className="mt-4 px-4 py-2 bg-gradient-to-br from-[rgba(0,97,209,0.82)] to-[rgba(49,84,118,0.78)] text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
//                     >
//                       {item.learnMore}
//                     </button>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </>
//       )}
//     </div>
//   );
// };

// export default HealthcareSection;

"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useParamsContext } from "@/context/PageContext";

interface CategoryData {
  image: string;
  title: string;
  desc: string;
  learnMore: string;
}

interface HealthcareSectionProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  slectedItem: string;  // Add this line
}

const HealthcareSection = ({ isChatOpen, setIsChatOpen }: HealthcareSectionProps) => {
  const { selectedPage } = useParamsContext();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<{
    header: string;
    subheader: string;
    categories: Record<string, CategoryData[]>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setRawData(result);
        updateHealthcareData(result, selectedPage?.pageName || 'home');
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawData) {
      updateHealthcareData(rawData, selectedPage?.pageName || 'home');
    }
  }, [selectedPage, rawData]);

  const updateHealthcareData = (data: any, pageName: string) => {
    // Remove leading slash if exists
    const cleanPageName = pageName.startsWith('/') ? pageName.substring(1) : pageName;
    
    // Get the healthcare data for the current page or fallback to home
    const pageData = data[cleanPageName]?.applicationstype || data.home?.applicationstype;
    
    if (pageData) {
      setData(pageData);
      const categoryKeys = Object.keys(pageData.categories || {});
      setCategories(categoryKeys);
      setActiveCategory(categoryKeys[0] || "");
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6 text-center">Loading AI applications...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto p-6 text-center text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="max-w-6xl mx-auto p-6 text-center">No data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Heading */}
      <div className="text-center mb-16 pt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
            {data.header}
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {data.subheader}
        </p>
      </div>
      
      {categories.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="w-full"
          >
            {data.categories[activeCategory]?.map((item, index) => (
              <SwiperSlide key={index} className="pb-4">
                <div className="h-full p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow flex flex-col">
                  <img 
                    src={item.image} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/placeholder.jpg';
                    }}
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 flex-1">{item.desc}</p>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="mt-4 px-4 py-2 bg-gradient-to-br from-[rgba(0,97,209,0.82)] to-[rgba(49,84,118,0.78)] text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                    >
                      {item.learnMore}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default HealthcareSection;