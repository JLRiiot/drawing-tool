import { IconType } from "react-icons";
import Tooltip from "../atoms/Tooltip";
import ToolItem from "../atoms/ToolItem";

export interface ToolProps {
  icon: IconType;
  toolName: string;
  selected?: boolean;
  onClick?: () => void;
}

function Tool({ icon, toolName, onClick, selected = false }: ToolProps) {
  return (
    <Tooltip text={toolName}>
      <ToolItem selected={selected} icon={icon} onClick={onClick}></ToolItem>
    </Tooltip>
  );
}

export default Tool;
