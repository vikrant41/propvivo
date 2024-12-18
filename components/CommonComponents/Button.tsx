import React, { forwardRef } from "react";
import { ArrowIcon } from "../shared/Icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "tertiary";
  size?: "default" | "custom";
  isDownloadIcon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      children,
      className,
      isDownloadIcon,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "secondary":
          return "btn btn-secondary";
        case "tertiary":
          return "btn btn-tertiary";
        case "default":
        default:
          return "btn";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "custom":
          return "";
        case "default":
        default:
          return "";
      }
    };

    const buttonClasses = [
      "flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group font-outfit",
      getVariantClasses(),
      getSizeClasses(),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button className={buttonClasses} ref={ref} type="button" {...props}>
        <span className="flex gap-2 font-normal">{children}</span>
        {variant === "default" && (
          <ArrowIcon className="group-hover:translate-x-1 transition-all duration-300" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
