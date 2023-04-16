import React from "react";
import { IconType } from "react-icons";

interface ToolItemProps {
  icon: IconType;
  onClick?: () => void;
  children?: React.ReactNode;
}

function ToolItem({ icon: Icon, onClick }: ToolItemProps) {
  return (
    <div onClick={onClick} className="p-4 border-b hover:bg-gray-100">
      <div className="flex items-center">
        <Icon className="" />
      </div>
    </div>
  );
}

export default ToolItem;
