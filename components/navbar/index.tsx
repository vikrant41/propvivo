import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoMain, MenuArrow, MenuNewArrow } from "../shared/Icons";
import { Button } from "../CommonComponents/Button";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const routeTo = process.env.NEXT_PUBLIC_LOGIN_URL;
  const dropdownRef = useRef(null);
  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

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

  const [openSolution, setOpenSolution] = useState(false);
  const [openResources, setOpenResources] = useState(false);
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
      <div className="max-w-1290 px-4 mx-auto">
        <div className="flex justify-between items-center gap-x-8 xl:gap-x-20 h-full">
          <Link href="/" passHref>
            <a>
              <img src="/PropVIVO.png" className="propvivoLogo" />
            </a>
          </Link>

          <div
            className={`hidden flex-1 lg:flex lg:flex-row items-center justify-between gap-x-8 xl:gap-x-20 text-white transition-all duration-500 ease-in-out transform origin-top menuTop ${
              isMenuOpen ? "menuOpen" : ""
            } lg:block fixed lg:static top-0 left-0 w-full h-screen lg:h-auto bg-accent lg:bg-transparent p-5 lg:p-0 z-40 lg:z-auto`}
            style={{ transitionProperty: "opacity, max-height, transform" }}
          >
            <ul
              className={`lg:flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 lg:gap-6 xl:gap-8  w-full`}
            >
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
                <Link href="/services" passHref>
                  <a
                    className={router.pathname === "/services" ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Services
                  </a>
                </Link>
              </li>

              {/* <li className="cursor-pointer relative navbar_link font-outfit font-medium">
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
              </li> */}

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
                  className="flex justify-between items-center gap-x-2 hasSubmenu cursor-pointer w-full lg:pb-4 relative lg:top-2"
                  onClick={() => {
                    if (isMobile) {
                      setOpenResources(!openResources);
                    }
                  }}
                >
                  Documents{" "}
                  <span
                    className={`transition-transform ${
                      openResources ? "rotate-270" : ""
                    }`}
                  >
                    <MenuNewArrow />
                  </span>
                </div>

                <ul
                  className={`relative lg:absolute left-0  w-full lg:w-52 bg-accent lg:shadow-lg rounded-md lg:border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 lg:invisible group-hover:visible lg:-translate-y-4 group-hover:translate-y-0 transition-all duration-150 lg:p-2 space-y-3 ${
                    isMobile && openResources
                      ? "max-h-96 opacity-100 visible mt-4"
                      : "max-h-0 opacity-0 invisible lg:group-hover:max-h-max lg:group-hover:visible lg:group-hover:opacity-100"
                  }`}
                >
                  <li className="hover:bg-accent1/30 transition-all duration-300 rounded-md">
                    <Link href="/ResaleCertificate">
                      <a
                        className={`block p-2 text-sm ${
                          router.pathname === "/ResaleCertificate"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                        onClick={handleLinkClick}
                      >
                        Resale Certificate
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1/30 transition-all duration-300 rounded-md">
                    <Link href="/DemandStatement">
                      <a
                        className={`block p-2 text-sm ${
                          router.pathname === "/DemandStatement"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                        onClick={handleLinkClick}
                      >
                        Demand Statement
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1/30 transition-all duration-300 rounded-md">
                    <Link href="/CondoQuestionnaire">
                      <a
                        className={`block p-2 text-sm ${
                          router.pathname === "/CondoQuestionnaire"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                        onClick={handleLinkClick}
                      >
                        Condo Questionnaire
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="relative group navbar_link font-outfit font-medium">
                <div
                  className="flex justify-between items-center gap-x-2 hasSubmenu cursor-pointer w-full lg:pb-4 relative lg:top-2"
                  onClick={() => {
                    if (isMobile) {
                      setOpenSocials(!openSocials);
                    }
                  }}
                >
                  Socials{" "}
                  <span
                    className={`transition-transform ${
                      openSocials ? "rotate-270" : ""
                    }`}
                  >
                    <MenuNewArrow />
                  </span>
                </div>

                <ul
                  className={`relative lg:absolute left-0 w-full lg:w-52 bg-accent lg:shadow-lg rounded-md lg:border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 lg:invisible group-hover:visible lg:-translate-y-4 group-hover:translate-y-0 transition-all duration-200 lg:p-2 space-y-3 ${
                    isMobile && openSocials
                      ? "max-h-96 opacity-100 visible mt-4"
                      : "max-h-0 opacity-0 invisible lg:group-hover:max-h-max lg:group-hover:visible lg:group-hover:opacity-100"
                  }`}
                >
                  <li className="hover:bg-accent1/30 transition-all duration-300 rounded-md">
                    <Link href="/blog">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/blog"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                        onClick={handleLinkClick}
                      >
                        Blog
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-accent1/30 transition-all duration-300 rounded-md">
                    <Link href="/MarketPlace">
                      <a
                        className={`block px-4 py-2 text-sm ${
                          router.pathname === "/MarketPlace"
                            ? "bg-accent1 rounded-md"
                            : ""
                        }`}
                        onClick={handleLinkClick}
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
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>

            <ul
              className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 text-white`}
            >
              <li className="cursor-pointer relative font-outfit font-medium">
                <Link href={loginUrl} passHref>
                  <a
                    className={router.pathname === loginUrl ? "active" : ""}
                    onClick={handleLinkClick}
                    target="_blank"
                  >
                    <Button>Login</Button>
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
