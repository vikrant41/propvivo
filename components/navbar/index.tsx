import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoMain } from "../shared/Icons";
import { Button } from "../CommonComponents/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    // Cleanup to ensure no class remains on unmount
    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to determine if the link is active
  const isActive = (href: string) => router.pathname === href;

  // Close the menu when a link is clicked (on mobile)
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={`w-full py-3 lg:py-5 z-50 transition-all duration-500 bg-accent shadow-menuShadow relative ${
        isScrolled ? "shadow-lg backdrop-blur-lg" : ""
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center h-full">
          <Link href="/" passHref>
            <a>
              <img src="/PropVIVO.png" className="propvivoLogo" />
            </a>
          </Link>

          <div
            className={`hidden lg:flex lg:flex-row items-center justify-end gap-x-20 text-white transition-all duration-500 ease-in-out transform origin-top menuTop ${
              isMenuOpen ? "menuOpen" : ""
            } lg:block fixed lg:static top-0 left-0 w-full h-screen lg:h-auto bg-accent lg:bg-transparent p-5 lg:p-0 z-40 lg:z-auto`}
            style={{ transitionProperty: "opacity, max-height, transform" }}
          >
            <ul className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7`}>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/" passHref>
                  <a
                    className={router.pathname === "/" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/about" passHref>
                  <a
                    className={router.pathname === "/about" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    About Us
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/technology" passHref>
                  <a
                    className={
                      router.pathname === "/technology" ? "active" : ""
                    }
                    onClick={handleLinkClick}
                  >
                    Technology
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/services" passHref>
                  <a
                    className={router.pathname === "/services" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Services
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/blog" passHref>
                  <a
                    className={router.pathname === "/blog" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Blog
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/contact" passHref>
                <a
                    className={router.pathname === "/contact" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>

            <ul className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 text-white`}>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="http://login.devpropvivo.co/login" passHref>
                  <a
                    className={
                      router.pathname === "http://login.devpropvivo.co/login" ? "active" : "text-white"
                    }
                    onClick={handleLinkClick}
                    target="_blank"
                  >
                    Login
                  </a>
                </Link>
              </li>
              <li className="cursor-pointer relative font-outfit font-medium">
                <Link href="http://login.devpropvivo.co/login" passHref>
                  <a
                    className={router.pathname === "http://login.devpropvivo.co/login" ? "active" : ""}
                    onClick={handleLinkClick}
                    target="_blank"
                  >
                    <Button>Get Started</Button>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`toggleMenu transition-all bg-maroon hover:bg-maroonLight w-11 h-11 flex justify-center items-center rounded-tl-md rounded-bl-md cursor-pointer overflow-hidden absolute right-1 lg:hidden ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
