import React from "react";
import SubHeading from "./SubHeading";
interface SectionTitleProps {
  subtitle: string;
  title: string;
  content?: string;
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
      <div className="text-center mb-9 md:mb-12">
        <SubHeading text={subtitle} />
        <h2 className="leading-snug pt-2 mb-1">{title}</h2>
        <div className="mx-auto mt-1 space-y-2" style={{ maxWidth }}>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default SectionTitle;
