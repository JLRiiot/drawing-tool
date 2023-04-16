import { IconType } from "react-icons";
import Tooltip from "../atoms/Tooltip";
import ToolItem from "../atoms/ToolItem";

export interface ToolProps {
  icon: IconType;
  toolName: string;
  onClick?: () => void;
}

function Tool({ icon, toolName, onClick }: ToolProps) {
  return (
    <Tooltip text={toolName}>
      <ToolItem icon={icon} onClick={onClick}></ToolItem>
    </Tooltip>
  );
}

export default Tool;
