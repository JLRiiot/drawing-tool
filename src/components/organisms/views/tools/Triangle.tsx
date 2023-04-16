import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import { TriangleToolViewModel } from "../../../../viewmodels/tools/Triangle";
import Tool from "../../../molecules/Tool";
import { BsTriangle } from "react-icons/bs";
import { useMemo } from "react";

export interface TriangleToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const TriangleToolView = observer(
  ({ drawingViewModel }: TriangleToolViewProps) => {
    const tool = useMemo(() => new TriangleToolViewModel(drawingViewModel), []);

    return (
      <Tool
        selected={drawingViewModel.currentTool === tool}
        icon={BsTriangle}
        toolName="Triangle"
        onClick={() => drawingViewModel.setCurrentTool(tool)}
      />
    );
  }
);

export default TriangleToolView;
