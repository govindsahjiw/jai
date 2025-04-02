// herosection.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Avatar from "../../public/img/avatar.webp";
import Link from 'next/link';
import { useState } from "react";

interface Slide {
  image: string;
  heading: string;
  subheading: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface HeroSectionProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean, chatType?: string) => void;
  heroData?: {
    slides?: Slide[];
    benefits?: Benefit[];
    meeting?: string; // Added meeting field to handle the form's meeting link
  };
}

export default function HeroSection({
  isChatOpen,
  setIsChatOpen,
  heroData
}: HeroSectionProps) {
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);

  if (!heroData) return null;

  // Map benefit titles to snake_case conversation types
  const benefitToConversationMap: Record<string, string> = {
    "Reduce development time by up to 40%": "reduce_development_time_by_up_to_40_percent",
    "Improve software quality by 30–50%": "improve_software_quality_by_30_50_percent",
    "Speed up delivery by 25%": "speed_up_delivery_by_25_percent",
    "Reduce deployment pipeline effort by up to 60%": "reduce_development_pipeline_effort_by_up_to_60_percent",
    "Component Library": "component_library", // Angular
    "RxJS Optimization": "rxjs_optimization",
    "Performance Tuning": "performance_tuning",
    "NgRx State Management": "ngrx_state_management",
    "Real-time APIs": "real_time_apis", // Node
    "Microservices Architecture": "microservices_architecture",
    "Database Optimization": "database_optimization",
    "Serverless Node.js": "serverless_node_js",
    "Component Library1": "component_library_react", // React
    "State Management": "state_management",
    "Performance Optimization": "performance_optimization",
    "Next.js Integration": "next_js_integration",
    "AI Code Generation": "ai_code_generation", // AI Agent
    "Automated Testing": "automated_testing",
    "Predictive Analytics": "predictive_analytics",
    "Natural Language Processing": "natural_language_processing",
  };

  return (
    <div className="relative w-full bg-gray-50">
      {/* Swiper Slider */}
      <div className="h-[60vh] overflow-hidden relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false }}
          loop
          speed={800}
          className="w-full h-full"
        >
          {heroData.slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image || ""}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
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

        {/* Bottom Benefits Grid - Absolutely positioned below slider for md and up */}
        <div className="absolute bottom-0 left-0 right-0 md:block hidden z-10 px-4 p-4">
          <div className="container max-w-5xl lg:max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-4 gap-3">
              {heroData.benefits?.map((benefit, index) => (
                <div
                  key={index}
                  onClick={() => setIsChatOpen(true, benefitToConversationMap[benefit.title] || 'general')}
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
        </div>
      </div>

      {/* Left Chat Widget */}
      <div className={`absolute ${isChatOpen ? 'hidden' : 'flex'} flex-col items-center gap-3 
        left-4 top-[20%] md:top-1/2 -translate-y-1/2 z-20
        sm:left-6
        md:left-8
        lg:left-10`}>

        <div className="relative group">
          <Image
            src={Avatar}
            alt="AI Avatar"
            width={80}
            height={80}
            className="rounded-full shadow-xl border-4 border-white/20 group-hover:border-blue-400 transition-all duration-300 
            w-14 h-14 
            sm:w-16 sm:h-16
            md:w-20 md:h-20
            lg:w-24 lg:h-24"
          />
        </div>

        <div
          className="relative rounded-xl p-3 shadow-xl
          sm:p-4
          md:p-5"
          style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}
        >
          <button
            onClick={() => setIsChatOpen(true, "talk_to_hype")}
            className="cursor-pointer relative z-10 bg-white text-blue-600 rounded-full font-medium shadow-md hover:bg-gray-50 transition-all flex items-center gap-2
            px-3 py-1 text-xs
            sm:px-4 sm:py-1.5 sm:text-sm
            md:px-5 md:py-2 md:text-base"
          >
            <span>Talk To Hype</span>
            <span className="text-lg">🎙</span>
          </button>

          <div className="absolute -bottom-1 left-0 right-0 h-4 flex justify-center gap-1">
            {[3, 5, 7, 5, 3].map((height, i) => (
              <div
                key={i}
                className="w-1 bg-white/80 rounded-full animate-wave"
                style={{ height: `${height}px`, animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Benefits Grid - For screens below md */}
      <div className="container mx-auto px-4 py-8 md:hidden">
        <div className="grid grid-cols-1 gap-3">
          {heroData.benefits?.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setIsChatOpen(true, benefitToConversationMap[benefit.title] || 'general')}
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
        <div className="flex flex-col gap-2 md:gap-3 bg-white/90 backdrop-blur-sm p-1 md:p-3 rounded-xl shadow-lg border border-white">
          <Link href={heroData.meeting || "http://workspace.google.com/resources/appointment-scheduling/"} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <button
                className="text-white px-2 md:px-5 px-5 py-2 rounded-full font-medium text-xs md:text-sm transition-all shadow-sm whitespace-nowrap"
                style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}
              >
                Schedule 30 Min Call
              </button>
            </a>
          </Link>

          <button
            onClick={() => setIsFreeTrialOpen(true)}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-1 md:px-5 py-2 rounded-full font-medium text-xs md:text-sm transition-all whitespace-nowrap"
          >
            1 Week Free Trial
          </button>
        </div>
      </div>

      {/* Free Trial Modal */}
      {isFreeTrialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFreeTrialOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
            <button
              onClick={() => setIsFreeTrialOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Start Your Free Trial</h2>
              <p className="text-gray-600 mb-6">Get full access for 1 week with no commitment.</p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company (optional)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md"
                >
                  Start Free Trial
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

