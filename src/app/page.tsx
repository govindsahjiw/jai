"use client"; 

import { useState } from "react";
import HeroSection from "../components/HeroSection";
import UseCasesSection from "../components/UseCasesSection";
import HealthcareSection from "../components/HealthcareSection";
import Footer from "../components/Footer";
import CustomAISlider from "@/components/CustomAISlider";
import ChatInterface from "@/components/ChatInterface";
import { FaRobot } from "react-icons/fa";
import Header from "@/components/Header";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [slectedItem,setSelectedItem]= useState("home")
  return (
    <div className="relative flex">
      {/* Main Page Content (Shrinks when Chat Opens) */}
      <div
        className={`transition-all duration-300 ${
          isChatOpen ? "w-3/4" : "w-full"
        }`}
      >
        <Header setSelectedItem={setSelectedItem} />
        <HeroSection isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} slectedItem={slectedItem}/>
        <CustomAISlider isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} slectedItem={slectedItem}/>
        <UseCasesSection slectedItem={slectedItem}/>
        <HealthcareSection isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} slectedItem={slectedItem}/>
        <Footer />
      </div>

      {/* Chat Interface */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Chat Icon (Always Visible) */}
      <div
        className="fixed bottom-1/2 right-4 z-50 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => setIsChatOpen(true)}
      >
        <FaRobot className="text-2xl" />
      </div>
    </div>
  );
}
