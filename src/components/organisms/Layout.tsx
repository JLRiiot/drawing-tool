import React from "react";

interface LayoutProps {
  toolbar: React.ReactNode;
  drawingArea: React.ReactNode;
}

function Layout({ toolbar, drawingArea }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row flex-1">
        <div className="bg-gray-200 flex-none">{toolbar}</div>
        <div className="flex-1">{drawingArea}</div>
      </div>
    </div>
  );
}

export default Layout;
