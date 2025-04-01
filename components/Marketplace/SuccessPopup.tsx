import { useState, useEffect } from "react";
import { SuccessMessageIcon } from "../shared/Icons";


interface SuccessPopupProps {
  message: string;
  onClose?: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div className="w-full sm:w-[410px] p-16 relative bg-associationLightGreen text-associationGreen rounded-xl shadow-lg flex justify-center flex-col items-center font-outfit text-2xl font-semibold gap-8">
          <SuccessMessageIcon />
          {message}
        </div>
      </div>
    </>
  );
};

export default SuccessPopup;
