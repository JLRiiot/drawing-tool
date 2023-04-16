import React from "react";
import { IconType } from "react-icons";

interface ToolItemProps {
  icon: IconType;
  children?: React.ReactNode;
}

function ToolItem({ icon: Icon, children }: ToolItemProps) {
  return (
    <div className="p-4 border-b hover:bg-gray-100">
      <div className="flex items-center">
        <Icon className="" />
      </div>
    </div>
  );
}

export default ToolItem;
