"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Avatar from "../../public/img/avatar.webp";
import Link from 'next/link';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useState, useEffect } from "react";

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
    meeting?: string;
  };
  meetingLink: string;
}

export default function HeroSection({
  isChatOpen,
  setIsChatOpen,
  heroData,
  meetingLink,
}: HeroSectionProps) {
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [textToCopy, setTextToCopy] = useState<string>("");
 
  if (!heroData) return null;

  const benefitToConversationMap: Record<string, string> = {
    "Reduce development time by up to 40%": "reduce_development_time_by_up_to_40_percent",
    "Improve software quality by 30–50%": "improve_software_quality_by_30_50_percent",
    "Speed up delivery by 25%": "speed_up_delivery_by_25_percent",
    "Reduce deployment pipeline effort by up to 60%": "reduce_development_pipeline_effort_by_up_to_60_percent",
    "Component Library": "component_library",
    "RxJS Optimization": "rxjs_optimization",
    "Performance Tuning": "performance_tuning",
    "NgRx State Management": "ngrx_state_management",
    "Real-time APIs": "real_time_apis",
    "Microservices Architecture": "microservices_architecture",
    "Database Optimization": "database_optimization",
    "Serverless Node.js": "serverless_node_js",
    "Component Library1": "component_library_react",
    "State Management": "state_management",
    "Performance Optimization": "performance_optimization",
    "Next.js Integration": "next_js_integration",
    "AI Code Generation": "ai_code_generation",
    "Automated Testing": "automated_testing",
    "Predictive Analytics": "predictive_analytics",
    "Natural Language Processing": "natural_language_processing",
  };

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const startListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ 
      continuous: true, 
      language: 'en-IN',
    });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setChatMessages(prev => [...prev, {text: inputText, isUser: true}]);
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, {text: "Thanks for your message! How can I assist you further?", isUser: false}]);
      }, 1000);
      
      setInputText("");
      if (isListening) {
        stopListening();
      }
    }
  };

  const handleReset = () => {
    setInputText("");
    setChatMessages([]);
    resetTranscript();
    if (isListening) {
      stopListening();
    }
  };

  const handleReSpeak = () => {
    if (inputText) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      window.speechSynthesis.speak(utterance);
    }
  };

  
  const handleFreeTrialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      ipAddress: formData.get("ipAddress") as string,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyKXFC3svp6k1lVzjIYvLIuXuMXzlTXeOiyijrtof0Dxk54rjfPMOnA28JAFGgtTFo/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      setSubmitMessage("Free trial request submitted successfully!");
      setTimeout(() => {
        setIsFreeTrialOpen(false);
        setSubmitMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error submitting free trial:", error);
      setSubmitMessage("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
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

        {/* Bottom Benefits Grid */}
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
                  <p className="text-xs text-gray-650 mt-1 line-clamp-2">
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
        left-4 top-2/5 md:top-1/2 -translate-y-1/2 z-20
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
            onClick={() => {
              setIsChatModalOpen(true);
              startListening();
            }}
            className="cursor-pointer relative z-10 bg-white text-blue-600 rounded-full font-medium shadow-md hover:bg-gray-50 transition-all flex items-center gap-2
            px-3 py-1 text-xs
            sm:px-4 sm:py-1.5 sm:text-sm
            md:px-5 md:py-2 md:text-base"
          >
            <span>{isListening ? "Listening..." : "Talk To jAI"}</span>
            <span className="text-lg">🎙</span>
          </button>

          <div className="absolute -bottom-1 left-0 right-0 h-4 flex justify-center gap-1">
            {[3, 5, 7, 5, 3].map((height, i) => (
              <div
                key={i}
                className="w-1 bg-white/80 rounded-full animate-wave"
                style={{ 
                  height: `${isListening ? height : 3}px`, 
                  animationDelay: `${i * 150}ms`,
                  opacity: isListening ? 1 : 0.5
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{zIndex: 99999}}>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsChatModalOpen(false);
              if (isListening) stopListening();
            }}
          />

          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <button
              onClick={() => {
                setIsChatModalOpen(false);
                if (isListening) stopListening();
              }}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={Avatar}
                  alt="AI Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <h2 className="text-xl font-bold text-gray-800">Chat with jAI</h2>
                {isListening && (
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Listening</span>
                  </div>
                )}
              </div>

              <div className="h-64 mb-4 p-4 bg-gray-50 rounded-lg overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    {isListening ? "Speak now..." : "How can I help you today?"}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg max-w-[80%] ${
                          message.isUser 
                            ? "bg-blue-100 text-blue-900 ml-auto" 
                            : "bg-gray-200 text-gray-800 mr-auto"
                        }`}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Type your message..."}
                  className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  {inputText && (
                    <>
                      <button
                        onClick={handleReset}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        title="Reset"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={handleReSpeak}
                        className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                        title="Speak"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-1 ${isListening ? 'text-red-600' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                    title={isListening ? "Stop Listening" : "Start Listening"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    title="Send"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your component remains the same */}
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
          <Link href={meetingLink} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <button
                className="cursor-pointer text-white px-2 md:px-5 px-5 py-2 rounded-full font-medium text-xs md:text-sm transition-all shadow-sm whitespace-nowrap"
                style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}
              >
                Schedule 30 Min Call
              </button>
            </a>
          </Link>

          <button
            onClick={() => setIsFreeTrialOpen(true)}
            className="cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-50 px-1 md:px-5 py-2 rounded-full font-medium text-xs md:text-sm transition-all whitespace-nowrap"
          >
            1 Week Free Trial
          </button>
        </div>
      </div>

      {/* Free Trial Modal (keep your existing implementation) */}
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

              <form className="space-y-4" onSubmit={handleFreeTrialSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <input
                    type="text"
                    name="ipAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="IP Address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Start Free Trial"}
                </button>

                {submitMessage && (
                  <p className={`text-sm text-center mt-4 ${submitMessage.includes("success") ? "text-green-600" : "text-red-600"
                    }`}>
                    {submitMessage}
                  </p>
                )}

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