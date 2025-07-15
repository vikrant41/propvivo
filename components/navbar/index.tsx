import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoMain, MenuArrow } from "../shared/Icons";
import { Button } from "../CommonComponents/Button";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }

    // Cleanup to ensure no class remains on unmount
    return () => {
      body.classList.remove("overflow-hidden");
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

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [openDocuments, setOpenDocuments] = useState(false);
  const [openSocials, setOpenSocials] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <ul
              className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-4 w-full lg:w-auto`}
            >
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
                <Link href="/RequestProposal" passHref>
                  <a
                    className={
                      router.pathname === "/RequestProposal" ? "active" : ""
                    }
                    onClick={handleLinkClick}
                  >
                    Request for Proposal
                  </a>
                </Link>
              </li>
              <li className="relative group navbar_link font-outfit font-medium">
                <div
                  className="flex justify-between items-center gap-x-1 hasSubmenu cursor-pointer w-full"
                  onClick={() => setOpenDocuments(!openDocuments)}
                >
                  Documents
                  <span
                    className={`transition-transform ${
                      openDocuments ? "rotate-270" : "rotate-90"
                    }`}
                  >
                    <MenuArrow />
                  </span>
                </div>

                <ul
                  className={`relative lg:absolute left-0 lg:mt-3 w-full lg:w-52 bg-accent lg:shadow-lg rounded-md lg:border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 lg:invisible group-hover:visible lg:-translate-y-4 group-hover:translate-y-0 transition-all duration-200 lg:p-2 ${
                    isMobile && openDocuments
                      ? "max-h-96 opacity-100 visible mt-4"
                      : "max-h-0 opacity-0 invisible lg:group-hover:max-h-max lg:group-hover:visible lg:group-hover:opacity-100"
                  }`}
                >
                  <li className="hover:bg-accent1 transition-all duration-300 rounded-md">
                    <Link href="/ResaleCertificate">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/ResaleCertificate"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                      >
                        Resale Certificate
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1 transition-all duration-300 rounded-md">
                    <Link href="/DemandStatement">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/DemandStatement"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                      >
                        Demand Request
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1 transition-all duration-300 rounded-md">
                    <Link href="/CondoQuestionnaire">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/CondoQuestionnaire"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                      >
                        Condo Questionnaire
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative group navbar_link font-outfit font-medium">
                <div
                  className="flex justify-between items-center gap-x-1 hasSubmenu cursor-pointer w-full"
                  onClick={() => setOpenSocials(!openSocials)}
                >
                  Socials{" "}
                  <span
                    className={`transition-transform ${
                      openSocials ? "rotate-270" : "rotate-90"
                    }`}
                  >
                    <MenuArrow />
                  </span>
                </div>

                <ul
                  className={`relative lg:absolute left-0 lg:mt-3 w-full lg:w-52 bg-accent lg:shadow-lg rounded-md lg:border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 lg:invisible group-hover:visible lg:-translate-y-4 group-hover:translate-y-0 transition-all duration-200 lg:p-2 ${
                    isMobile && openSocials
                      ? "max-h-96 opacity-100 visible mt-4"
                      : "max-h-0 opacity-0 invisible lg:group-hover:max-h-max lg:group-hover:visible lg:group-hover:opacity-100"
                  }`}
                >
                  <li className="hover:bg-accent1 transition-all duration-300 rounded-md">
                    <Link href="/blog">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/blog"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                      >
                        Blog
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1 transition-all duration-300 rounded-md">
                    <Link href="/MarketPlace">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/MarketPlace"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                      >
                        Marketplace
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="/contact" passHref>
                  <a
                    className={router.pathname === "/contact" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Contact
                  </a>
                </Link>
              </li>
            </ul>

            <ul
              className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 text-white`}
            >
              <li className="cursor-pointer relative navbar_link font-outfit font-medium">
                <Link href="http://login.devpropvivo.co/login" passHref>
                  <a
                    className={
                      router.pathname === "http://login.devpropvivo.co/login"
                        ? "active"
                        : "text-white"
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
                    className={
                      router.pathname === "http://login.devpropvivo.co/login"
                        ? "active"
                        : ""
                    }
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
