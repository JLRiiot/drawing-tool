import { observer } from "mobx-react";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import { TriangleToolViewModel } from "../../../../viewmodels/tools/Triangle";
import Tool from "../../../molecules/Tool";
import { BsTriangle } from "react-icons/bs";

export interface TriangleToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const TriangleToolView = observer(
  ({ drawingViewModel }: TriangleToolViewProps) => {
    const toolViewModel = new TriangleToolViewModel(drawingViewModel);

    return (
      <Tool
        icon={BsTriangle}
        toolName="Triangle"
        onClick={() => drawingViewModel.setCurrentTool(toolViewModel)}
      />
    );
  }
);

export default TriangleToolView;
