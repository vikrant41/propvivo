import React from "react";
import SubHeading from "./SubHeading";

interface SectionTitleProps {
  subtitle: string;
  title: string;
content?: string | React.ReactNode;
  maxWidth?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  content,
  maxWidth = "100%",
}) => {
  return (
    <>
      <div className="text-center mb-9 md:mb-12 relative">
        <SubHeading text={subtitle} />
        <h2 className="leading-snug pt-2 mb-1 text-4xl md:text-[50px] text-associationBlack font-semibold font-outfit">{title}</h2>
        <div className="mx-auto mt-1 space-y-2 text-associationGray font-karla" style={{ maxWidth }}>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default SectionTitle;
