import React, { useEffect, useState } from "react";
import { SuccessIcon, TostErrorIcon } from "../Util/icons";

interface ToasterMessageProps {
  type: "success" | "warning" | "error";
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  hideModal?: () => void;
}

const ToasterMessage: React.FC<ToasterMessageProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 4000,
  hideModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger "enter" animation
    setTimeout(() => {
      setIsVisible(true);
    }, 50);

    if (autoClose) {
      const timer = setTimeout(() => {
        // Trigger "exit" animation
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          hideModal?.();
          onClose?.();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose, hideModal]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <SuccessIcon className="h-6 w-6 text-green-600 " />;
      case "warning":
        return <SuccessIcon className="h-6 w-6 text-yellow-500" />;
      case "error":
        return <TostErrorIcon className="h-6 w-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-lightGreen text-mediumShadeOfGreen border-l-4 border-mediumShadeOfGreen";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-800";
      case "error":
        return "bg-[#FFF1F1] text-[#FF4D4D] border-l-4 border-[#FF4D4D]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex items-center p-2 px-0.5 ${getBackgroundColor()} fixed z-50 top-14 w-80 md:w-auto min-w-52 md:min-w-96 transition-all duration-700 ${
        isVisible && !isExiting ? "right-0 md:right-6" : "-right-full"
      }`}
      style={{ zIndex: 62 }}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative top-0.5">{getIcon()}</div>
        <div className="text-sm">{message}</div>
      </div>
    </div>
  );
};

export default ToasterMessage;
