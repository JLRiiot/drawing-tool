import { observer } from "mobx-react-lite";
import { DrawingViewModel } from "../../../../viewmodels/Drawing";
import Tool from "../../../molecules/Tool";
import { useMemo } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { SelectionToolViewModel } from "../../../../viewmodels/tools/Selection";

export interface SelectionToolViewProps {
  drawingViewModel: DrawingViewModel;
}

const SelectionToolView = observer(
  ({ drawingViewModel }: SelectionToolViewProps) => {
    const tool = useMemo(
      () => new SelectionToolViewModel(drawingViewModel),
      [drawingViewModel]
    );

    return (
      <Tool
        selected={drawingViewModel.currentTool === tool}
        icon={AiOutlineSelect}
        toolName="Selection"
        onClick={() => drawingViewModel.setCurrentTool(tool)}
      />
    );
  }
);

export default SelectionToolView;
