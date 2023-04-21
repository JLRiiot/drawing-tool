import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { useMemo } from "react";
import { AiOutlineDrag } from "react-icons/ai";
import { MoveToolViewModel } from "../../../../viewmodels/tools/Move";

export interface MoveToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const MoveToolView = observer(({ drawingViewModel }: MoveToolViewProps) => {
  const tool = useMemo(
    () => new MoveToolViewModel(drawingViewModel),
    [drawingViewModel]
  );

  return (
    <Tool
      selected={drawingViewModel.currentTool === tool}
      icon={AiOutlineDrag}
      toolName="Move"
      onClick={() => drawingViewModel.setCurrentTool(tool)}
    />
  );
});

export default MoveToolView;
