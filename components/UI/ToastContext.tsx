import React, { createContext, useState, useContext } from "react";
import ToasterMessage from "./ToasterMessage";

interface ToastContextProps {
  showToast: (
    type: "success" | "warning" | "error",
    message: string,
    hideModal?: () => void
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    type: "success" | "warning" | "error";
    message: string;
    hideModal?: () => void;
  } | null>(null);

  const showToast = (
    type: "success" | "warning" | "error",
    message: string,
    hideModal?: () => void
  ) => {
    setToast({ type, message, hideModal });

    // Automatically hide the toast after 4 seconds
    setTimeout(() => {
      if (hideModal) hideModal();
      setToast(null);
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToasterMessage
          type={toast.type}
          message={toast.message}
          hideModal={() => {
            if (toast.hideModal) toast.hideModal(); // Call hideModal if passed
            setToast(null);
          }}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
