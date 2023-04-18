import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { BsSquare } from "react-icons/bs";
import { useMemo } from "react";
import { SquareToolViewModel } from "../../../../viewmodels/tools/Square";

export interface SquareToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const SquareToolView = observer(({ drawingViewModel }: SquareToolViewProps) => {
  const tool = useMemo(
    () => new SquareToolViewModel(drawingViewModel),
    [drawingViewModel]
  );

  return (
    <Tool
      selected={drawingViewModel.currentTool === tool}
      icon={BsSquare}
      toolName="Square"
      onClick={() => drawingViewModel.setCurrentTool(tool)}
    />
  );
});

export default SquareToolView;
