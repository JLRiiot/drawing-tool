import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { BsHexagon } from "react-icons/bs";
import { useMemo } from "react";
import { HexagonToolViewModel } from "../../../../viewmodels/tools/Hexagon";

export interface HexagonToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const HexagonToolView = observer(
  ({ drawingViewModel }: HexagonToolViewProps) => {
    const tool = useMemo(
      () => new HexagonToolViewModel(drawingViewModel),
      [drawingViewModel]
    );

    return (
      <Tool
        selected={drawingViewModel.currentTool === tool}
        icon={BsHexagon}
        toolName="Square"
        onClick={() => drawingViewModel.setCurrentTool(tool)}
      />
    );
  }
);

export default HexagonToolView;
