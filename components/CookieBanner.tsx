import { useEffect, useState } from "react";
import { Button } from "./CommonComponents/Button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  const closeBanner = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full py-3 lg:py-5 z-50 transition-all duration-500 bg-accent shadow-menuShadow ">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-2 md:gap-4 px-8 md:px-0">
          <p className="text-white font-karla mb-0">
            This site uses{" "}
            <a href="/cookies" className="text-accent1 underline">
              Cookies
            </a>{" "}
            By continuing to browse the site you are agreeing to our use of
            cookies.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={acceptCookies}
              className="flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group font-outfit btn !text-base !px-5 leading-none h-9"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={closeBanner}
        className="text-white text-lg font-bold px-2 absolute right-3 md:right-8 top-3 md:top-1/2 md:-translate-y-1/2"
      >
        ✕
      </button>
    </div>
  );
}
