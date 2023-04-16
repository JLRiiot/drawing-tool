import React from "react";
import { IconType } from "react-icons";

interface ToolItemProps {
  icon: IconType;
  selected: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function ToolItem({ icon: Icon, onClick, selected }: ToolItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b hover:bg-lime-200 ${
        selected ? "bg-lime-200" : ""
      }`}
    >
      <div className="flex items-center">
        <Icon className="" />
      </div>
    </div>
  );
}

export default ToolItem;
