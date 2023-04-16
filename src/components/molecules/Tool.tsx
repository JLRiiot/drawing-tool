import { IconType } from "react-icons";
import Tooltip from "../atoms/Tooltip";
import ToolItem from "../atoms/ToolItem";

export interface ToolProps {
  icon: IconType;
  toolName: string;
}

function Tool({ icon, toolName }: ToolProps) {
  return (
    <Tooltip text={toolName}>
      <ToolItem icon={icon}></ToolItem>
    </Tooltip>
  );
}

export default Tool;
