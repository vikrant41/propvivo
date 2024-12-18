import React, { useEffect, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultActiveId?: string;
};


const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveId }) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState<string>(defaultActiveId || tabs[0]?.id);
  
  return (
    <div className="flex flex-col lg:flex-row items-start gap-9">
      <div className="flex flex-col p-4 bg-pvLightBlue rounded-2xl" style={{
        width: isMobile ? "100%" : "360px"
      }}
      >
        <h5 className="px-5 pb-1">Our Services</h5>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-5 py-3 text-17 font-karla text-left rounded-md transition-all duration-200 hover:bg-accent1 hover:text-white ${
              activeTab === tab.id
                ? "bg-accent1 text-white"
                : "text-pvBlack"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="space-y-6 tabData fadeIn">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
