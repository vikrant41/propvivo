import React from "react";
import { useRouter } from "next/router";

interface BreadcrumbProps {
  links: Array<{ label: string; href: string }>;
}

const Breadcrumb = ({ links }: BreadcrumbProps) => {
  const router = useRouter();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-gray-600">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            <a
              href={link.href}
              className={`${
                index === links.length - 1
                  ? "text-gray-800 font-medium pointer-events-none"
                  : "hover:text-blue-500"
              }`}
              onClick={(e) => {
                e.preventDefault();
                router.push(link.href);
              }}
            >
              {link.label}
            </a>
            {index < links.length - 1 && (
              <span className="mx-2 text-gray-400"> {">"}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
