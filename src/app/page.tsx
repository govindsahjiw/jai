// // page.tsx
"use client";
import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import UseCasesSection from "../components/UseCasesSection";
import HealthcareSection from "../components/HealthcareSection";
import Footer from "../components/Footer";
import CustomAISlider from "@/components/CustomAISlider";
import ChatInterface from "@/components/ChatInterface";
import { FaRobot } from "react-icons/fa";
import Header from "@/components/Header";
import Popup from "@/components/Popup";

interface ApiData {
  [key: string]: {
    headermenu?: any[];
    herosection?: any;
    customaislider?: any;
    applicationstype?: any;
    aisolutionsbuild?: any;
  };
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatType, setChatType] = useState<string>('general');
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>(''); // State for meeting link
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhMip3u3aCJcS9-MRFNvvcV1U8l1QMBq8f7e5ETps05zxVWmhxmra0FDHvKtwA1yMP0pM8UgQVqZrfVAX7SMsiFie_MFQ0Wcw8mu-fHvibJSNecFv-GZWDhuyreynrmUkwJe4R4cTCek_7vkgxsPp_dudlE-9CbLUL6pYcuJHPnWpZJHS4yQRtRdVnQuGG5Lv8aUACbdY0-v-FCE2RDocS3I9bNhn1zL_xR9V53k1zjxzUIT-XrcOApKWl6pvb2bfFMeO2npARmeVF2INc29mCG-8Zci3hQxWrmEpqV&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: ApiData = await response.json();

        // Extract meeting link from the herosection
        const link = data.form?.herosection?.meeting || ''; // Adjust based on your JSON structure
        setMeetingLink(link);

        setApiData(data);
        const firstPage = Object.keys(data)[0] || "home";
        setSelectedItem(firstPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up timer for popup
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 70000); // 5 seconds in milliseconds  for testing

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);



  
  const handleSetIsChatOpen = (open: boolean, type?: string) => {
    setIsChatOpen(open);
    if (type) setChatType(type);
  };

  if (loading) return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <img
          src="/img/loader.gif"
          alt="Loading"
          className="mx-auto w-24 h-24 object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/img/fallback-loader.svg";
          }}
        />
        <p className="mt-3 text-gray-500">Welcome To Jai-Info Way...</p>
      </div>
    </div>
  );

  if (error) return <div className="w-full min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!apiData) return <div className="w-full min-h-screen flex items-center justify-center">No data available</div>;

  const currentPageData = apiData[selectedItem] || apiData["home"];

  return (
    <div className="relative flex">
      <div className={`transition-all duration-300 ${isChatOpen ? "w-3/4" : "w-full"}`}>
        <Header 
          setSelectedItem={setSelectedItem} 
          menuItems={apiData["home"]?.headermenu || []} 
        />
        <HeroSection 
          isChatOpen={isChatOpen} 
          setIsChatOpen={handleSetIsChatOpen} 
          heroData={currentPageData?.herosection}
          meetingLink={meetingLink} // Pass the meeting link as a prop
        />
        <CustomAISlider 
          isChatOpen={isChatOpen} 
          setIsChatOpen={handleSetIsChatOpen} 
          sliderData={currentPageData?.customaislider}
        />
        <UseCasesSection 
          useCasesData={currentPageData?.aisolutionsbuild} 
          isChatOpen={isChatOpen} 
          setIsChatOpen={handleSetIsChatOpen} 
        />
        <HealthcareSection 
          isChatOpen={isChatOpen} 
          setIsChatOpen={handleSetIsChatOpen} 
          healthcareData={currentPageData?.applicationstype}
        />
        <Footer />
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} conversationType={chatType as any} />
      <div
        className="fixed bottom-1/2 right-4 z-50 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => handleSetIsChatOpen(true)}
      >
        <FaRobot className="text-2xl" />
      </div>
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </div>
  );
}
