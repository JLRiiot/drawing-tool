import React from "react";

interface VerticalToolBarProps {
  children: React.ReactNode;
}

function VerticalToolBar({ children }: VerticalToolBarProps) {
  return (
    <div className="bg-gray-200 h-full w-16rem">
      <div className="py-4">{children}</div>
    </div>
  );
}

export default VerticalToolBar;
