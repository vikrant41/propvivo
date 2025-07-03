import React from "react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
    console.log("isOpen",isOpen)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-lg relative text-center">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Smiley Icon */}
        <div className="text-8xl mb-4 text-orange-500">😊</div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h2>

        {/* Message */}
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Thank you for contacting us. We will get back to you shortly.
        </p>
      </div>
    </div>
  );
};

export default ThankYouModal;
