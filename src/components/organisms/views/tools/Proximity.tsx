import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ProximityToolViewModel } from "../../../../viewmodels/tools/Proximity";

export interface ProximityToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const ProximityToolView = observer(
  ({ drawingViewModel }: ProximityToolViewProps) => {
    const tool = useMemo(
      () => new ProximityToolViewModel(drawingViewModel),
      [drawingViewModel]
    );

    return (
      <Tool
        selected={drawingViewModel.currentTool === tool}
        icon={AiOutlineCloseCircle}
        toolName="Proximity"
        onClick={() => drawingViewModel.setCurrentTool(tool)}
      />
    );
  }
);

export default ProximityToolView;
