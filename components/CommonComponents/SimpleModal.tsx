import { Close } from "../shared/Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  details: string | React.ReactNode;
}

export default function SimpleModal({
  isOpen,
  onClose,
  header,
  details,
}: ModalProps) {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-xl shadow-lg w-full sm:max-w-570 p-6 relative mx-5"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <div className={`flex items-center justify-center gap-3`}>
            <div
              className="w-7 h-0.5 bg-btnDarkBlue rounded-xl"
              style={{ height: "3px" }}
            />
            <div className="font-outfit text-22 font-medium text-associationBlack">
              {header}
            </div>
          </div>
        
          <button onClick={onClose}>
            <Close className="group" />
          </button>
        </div>

        {/* Modal Content */}
        <p className="text-gray-500">{details}</p>
      </div>
    </div>
  );
}
