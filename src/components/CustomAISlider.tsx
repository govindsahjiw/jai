////customaislider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

interface CustomAISliderProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean, conversationType?: string) => void;
  sliderData?: {
    jaiservices: Service[];
    jaiserviceshead: ServiceHeader[];
    hiredeveloper: ServiceHeader[];
    developer: Developer[];
    logo: Logo[];
  };
}

export default function CustomAISlider({ 
  isChatOpen, 
  setIsChatOpen,
  sliderData 
}: CustomAISliderProps) {
  if (!sliderData || (
    sliderData.jaiservices.length === 0 && 
    sliderData.developer.length === 0 && 
    sliderData.logo.length === 0
  )) return null;

  const serviceToConversationMap: Record<string, string> = {
    "Web Application Development": "web_application_development",
    "Mobile App Development": "mobile_app_development",
    "Enterprise Software Solutions": "enterprise_software_solutions",
    "API & System Integration": "api_system_integration",
    "Angular Web Application Development": "angular_web_application_development",
    "Enterprise Angular Solutions": "enterprise_angular_solutions",
    "Angular Component Library Development": "angular_component_library_development",
    "Angular Performance Optimization": "angular_performance_optimization",
    "Node.js API Development": "node_js_api_development",
    "Microservices Architecture": "microservices_architecture",
    "Real-time Application Development": "real_time_application_development",
    "Serverless Node.js Solutions": "serverless_node_js_solutions",
    "React Web Application Development": "react_web_application_development",
    "React Native Mobile Development": "react_native_mobile_development",
    "Custom React Component Development": "custom_react_component_development",
    "React State Management Solutions": "react_state_management_solutions",
    "AI-Powered Application Development": "ai_powered_application_development",
    "Machine Learning Integration": "machine_learning_integration",
    "Natural Language Processing Solutions": "natural_language_processing_solutions",
    "Predictive Analytics Implementation": "predictive_analytics_implementation"
  };

  // Developer conversation map based on their name (converted to snake_case)
  const developerToConversationMap = (name: string) => 
    name.toLowerCase().replace(/\s+/g, '_');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {sliderData.jaiserviceshead.length > 0 && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sliderData.jaiserviceshead[0].offerheading}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sliderData.jaiserviceshead[0].offersubheading}
            </p>
          </div>
        )}

        {sliderData.jaiservices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sliderData.jaiservices.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                onClick={() => setIsChatOpen(true, serviceToConversationMap[service.weofferheading] || 'general')}
              >
                <h3 className="text-lg font-medium text-gray-800">{service.weofferheading}</h3>
                <p className="text-sm text-gray-500 mt-2">{service.weofferlearnmore} →</p>
              </div>
            ))}
          </div>
        )}

        {sliderData.hiredeveloper.length > 0 && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sliderData.hiredeveloper[0].offerheading}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sliderData.hiredeveloper[0].offersubheading}
            </p>
          </div>
        )}

        {sliderData.developer.length > 0 && (
          <div className="mb-20">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true, el: '.developer-pagination', type: 'bullets' }}
              autoplay={{ delay: 2400, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: true }}
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
                  <DeveloperCard 
                    developer={dev} 
                    onClick={() => setIsChatOpen(true, developerToConversationMap(dev.name))}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {sliderData.logo.length > 0 && (
          <div className="text-center">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by innovative companies</h3>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={40}
              slidesPerView={2}
              autoplay={{ delay: 500, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
                    <img src={logo.logo_image} alt={logo.logo_name} className="h-8 object-contain" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

interface DeveloperCardProps {
  developer: Developer;
  onClick: () => void;
}

function DeveloperCard({ developer, onClick }: DeveloperCardProps) {
  const skillsArray = Array.isArray(developer.skills) ? 
    developer.skills : 
    typeof developer.skills === 'string' ? 
      developer.skills.split(', ') : 
      [];

  return (
    <div 
      className="max-w-xs mx-auto rounded-xl shadow-lg overflow-hidden relative h-[420px] cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="absolute inset-0 z-0">
        <img src={developer.image} alt={developer.name} className="w-full h-full object-cover brightness-[0.85]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end py-6 px-1">
        <div className="self-end mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            developer.status === "Top 3%" ? 
              "bg-purple-500/20 text-purple-100 backdrop-blur-sm border border-purple-400/30" : 
              "bg-white/20 text-white backdrop-blur-sm border border-white/30"
          }`}>
            {developer.status}
          </span>
        </div>

        <div className="bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl">
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-white">{developer.name}</h2>
          </div>
          <div className="flex flex-wrap gap-x-2">
            {skillsArray.map((skill, i) => (
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
