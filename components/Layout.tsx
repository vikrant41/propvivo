import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./CommonComponents/Footer";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
