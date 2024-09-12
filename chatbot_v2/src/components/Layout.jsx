// src/components/Layout.jsx
import React from 'react';
import '../globals.css'; // Import your global styles here if necessary



const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* You can wrap this with header or sidebar if necessary */}
      {children}
    </div>
  );
};

export default Layout;