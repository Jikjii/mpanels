import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-tl from-gray-700 via-gray-900 to-black">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
