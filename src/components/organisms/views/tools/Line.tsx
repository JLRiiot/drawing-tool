import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { BsPencil } from "react-icons/bs";
import { useMemo } from "react";
import { LineToolViewModel } from "../../../../viewmodels/tools/Line";

export interface LineToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const LineToolView = observer(({ drawingViewModel }: LineToolViewProps) => {
  const tool = useMemo(
    () => new LineToolViewModel(drawingViewModel),
    [drawingViewModel]
  );

  return (
    <Tool
      selected={drawingViewModel.currentTool === tool}
      icon={BsPencil}
      toolName="Triangle"
      onClick={() => drawingViewModel.setCurrentTool(tool)}
    />
  );
});

export default LineToolView;
