
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

interface CategoryData {
  image: string;
  title: string;
  desc: string;
  learnMore: string;
}

interface HealthcareSectionProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean, conversationType?: string) => void;
  healthcareData?: any; // Allow raw data or transformed data
}

export default function HealthcareSection({ 
  isChatOpen, 
  setIsChatOpen,
  healthcareData 
}: HealthcareSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [transformedData, setTransformedData] = useState<{
    header: string;
    subheader: string;
    categories: Record<string, CategoryData[]>;
  } | null>(null);

  // Transform applicationstype data into grouped categories
  const transformHealthcareData = (data: any) => {
    if (!data?.applicationstype) return null;
    const categories: Record<string, CategoryData[]> = {};
    data.applicationstype.forEach((item: any) => {
      const category = item[2]; // Column 2 is the category (e.g., "LLMs")
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({
        image: item[4], // Column 4 is the image
        title: item[5], // Column 5 is the title
        desc: item[6],  // Column 6 is the description
        learnMore: item[7] // Column 7 is "Learn More"
      });
    });
    return {
      header: "AI Application Categories",
      subheader: "Explore how our AI solutions can transform your business across various domains.",
      categories
    };
  };

  useEffect(() => {
    if (healthcareData) {
      // Check if healthcareData is already transformed or needs transformation
      if (healthcareData.categories) {
        setTransformedData(healthcareData);
      } else {
        const transformed = transformHealthcareData(healthcareData);
        setTransformedData(transformed);
      }
    }
  }, [healthcareData]);

  useEffect(() => {
    if (transformedData?.categories) {
      const categories = Object.keys(transformedData.categories);
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
    }
  }, [transformedData]);

  if (!transformedData || !transformedData.categories) return null;

  const categories = Object.keys(transformedData.categories);

  // Mapping of titles to conversation types (snake_case)
  const titleToConversationMap: Record<string, string> = {
    "LLMs for Strategic Planning": "llms_for_strategic_planning",
    "Market Research Enhancement": "market_research_enhancement",
    "Content Generation": "content_generation",
    "Business Growth Strategies": "business_growth_strategies",
    "Competitive Analysis": "competitive_analysis",
    "Financial Forecasting": "financial_forecasting",
    "Risk Management": "risk_management",
    "Key Performance Indicators": "key_performance_indicators",
    "Employee Productivity Analysis": "employee_productivity_analysis",
    "Process Automation": "process_automation",
    "Customer Support Automation": "customer_support_automation",
    "Patient Data Enrichment": "patient_data_enrichment",
    "Medical Imaging Analysis": "medical_imaging_analysis",
    "Predictive Analytics": "predictive_analytics",
    "Fraud Detection": "fraud_detection",
    "Data Cleansing": "data_cleansing",
    "Data Integration": "data_integration",
    "Predictive Marketing Campaigns": "predictive_marketing_campaigns",
    "Customer Segmentation": "customer_segmentation",
    "AI-Driven Cloud Optimization": "ai_driven_cloud_optimization",
    "Cloud Security": "cloud_security",
    "AI in Supply Chain": "ai_in_supply_chain",
    "AI in Business Intelligence": "ai_in_business_intelligence",
    "Inventory Management": "inventory_management",
    "Logistics Optimization": "logistics_optimization"
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-16 pt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {transformedData.header}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {transformedData.subheader}
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
            {transformedData.categories[activeCategory]?.map((item, index) => (
              <SwiperSlide key={index} className="pb-4">
                <div className="h-full p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow flex flex-col">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 flex-1">{item.desc}</p>
                    <button
                      onClick={() => setIsChatOpen(true, titleToConversationMap[item.title] || "general")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
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
}