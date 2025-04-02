import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTimes } from "react-icons/fa";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-500 scale-100 hover:scale-105 flex" style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}>
        {/* Left Side: Logo and Stay Connected */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          {/* Company Logo */}
          <img
            src="https://media.licdn.com/dms/image/v2/D4E0BAQEKfv5srte9Ug/company-logo_200_200/company-logo_200_200/0/1680544638537/jaiinfoway_logo?e=2147483647&v=beta&t=ZnaSy_UdAAa2vRJ_QY2DsW6gP_Ktl631KdqCqVplexo"
            alt="jAIinfoway Logo"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          {/* Stay Connected Section */}
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm mb-2">Stay Connected</h3>
            <div className="flex space-x-3 justify-center">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="https://www.instagram.com/jaiinfowayofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/jaiinfoway/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-2/3 pl-6 flex flex-col justify-center">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-white hover:text-blue-200 transition-all duration-300"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Text */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3 drop-shadow-md">
              Welcome to jAIinfoway!
            </h2>
            <p className="text-white mb-4 text-opacity-90 text-sm">
              Let's take your experience to the next level. Chat with our AI assistant or schedule a call to explore how we can transform your ideas into reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

