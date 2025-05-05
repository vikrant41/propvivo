import React from "react";
import Link from "next/link";
import { useBreadcrumbs } from "../../contexts/BreadCrumbContext";

interface BannerProps {
  backgroundImage: string;
  title: string;
}

const TopBanner: React.FC<BannerProps> = ({ backgroundImage, title }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <div
      className="relative w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center after:absolute after:bg-accent/30 after:top-0 after:left-0 after:w-full after:h-full after:z-0 px-5"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-6xl text-white">{title}</h1>
        <nav className="">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index} className="text-white">
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>
                  <a className="hover:underline text-gray-o-70 transition-all duration-300">{breadcrumb.name}</a>
                </Link>
              ) : (
                breadcrumb.name
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2">{">"}</span>}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TopBanner;
