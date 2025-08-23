import React, { useEffect, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  activeBgColor: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultActiveId?: string;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveId }) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveId || tabs[0]?.id
  );

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, [tabs]);

  return (
    <div className="">
      {/* Tabs Row */}
      <div className="container relative mb-7 md:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mx-auto" style={{maxWidth: "1000px"}}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`flex flex-col items-center gap-2 px-1 py-4 md:py-6 rounded-md font-outfit font-medium font-base transition-all duration-300 shadow-keyShadow
                ${
                  isActive
                    ? `${tab.activeBgColor} text-white `
                    : "bg-white text-pvBlack hover:bg-pvLightBlue"
                }`}
              >
                <span className="text-lg">
                  {isActive ? tab.activeIcon : tab.icon}
                </span>
                <span className="">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {tabs.map(
        (tab) =>
          activeTab === tab.id && (
            <div key={tab.id} className="fadeIn">
              {tab.content}
            </div>
          )
      )}
    </div>
  );
};

export default Tabs;
