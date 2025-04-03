import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTimes } from "react-icons/fa";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [contactInput, setContactInput] = useState({ email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const data = {
      email: contactInput.email.trim(),
      phone: contactInput.phone.trim(),
    };

    if (!data.email && !data.phone) {
      setSubmissionError("Please provide at least an email or phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz0YiHLDkFRvy4pVOjvW9Prb1QK2nTppv658kr5QedNHk_5Efz9LEaJ6YpJu1_JrZQOJA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "no-cors",
        }
      );

      setContactInput({ email: "", phone: "" });
      setSubmissionSuccess(true);
      // Close the popup after a short delay to allow the user to see the success message
      setTimeout(() => {
        onClose();
      }, 500); 
    } catch (error) {
      console.error("Error submitting contact data:", error);
      setSubmissionError("Failed to save contact information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md flex items-center justify-center z-[999]"
      style={{ zIndex: 999 }}
    >
      <div
        className="relative p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-500 scale-100 hover:scale-105 flex"
        style={{ background: "linear-gradient(to right, #0061d1d1, #315476c7)" }}
      >
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

          {/* Text and Form */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3 drop-shadow-md">
              Welcome to jAIinfoway!
            </h2>
            <p className="text-white mb-4 text-opacity-90 text-sm">
              Let's take your experience to the next level. Chat with our AI assistant or schedule a call to explore how we can transform your ideas into reality.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-white">Email</label>
                <input
                  type="email"
                  value={contactInput.email}
                  onChange={(e) => setContactInput({ ...contactInput, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-300 text-sm"
                  required={!contactInput.phone.trim()}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white">Phone</label>
                <input
                  type="tel"
                  value={contactInput.phone}
                  onChange={(e) => setContactInput({ ...contactInput, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-300 text-sm"
                  required={!contactInput.email.trim()}
                />
              </div>
              {submissionError && (
                <p className="text-xs text-red-200 text-center">{submissionError}</p>
              )}
              {submissionSuccess && (
                <p className="text-xs text-green-200 text-center">
                  Thank you! Your contact information has been saved.
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || (!contactInput.email.trim() && !contactInput.phone.trim())}
                className="w-full bg-white text-blue-600 py-1.5 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;