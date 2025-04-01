import React from "react";

interface SubHeadingProps {
  text: string;
  isLeft?: boolean;
  showLeftLine?: boolean; 
  showRightLine?: boolean;
  clsName?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({
  text,
  isLeft = false,
  showLeftLine = true,
  showRightLine = true,
  clsName,
}) => {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${clsName} ${isLeft && "!justify-start"}`} style={{gap: "10px"}}>
      {showLeftLine && <div className="w-7 h-0.5 bg-associationGreen rounded-xl" style={{height: "3px"}}/>}
      <div className="font-outfit text-base tracking-wider text-associationBlack">
        {text}
      </div>
      {showRightLine && <div className="w-7 h-0.5 bg-associationGreen rounded-xl" style={{height: "3px"}} />}
    </div>
  );
};

export default SubHeading;
 