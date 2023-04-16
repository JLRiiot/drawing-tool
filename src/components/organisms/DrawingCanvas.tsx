import { DrawingViewModel } from "../../viewmodels/Drawing";
import Canvas from "../atoms/Canvas";
import DrawingView from "./views/Drawing";

export interface DrawingCanvasProps {
  drawingViewModel: DrawingViewModel;
}

function DrawingCanvas({ drawingViewModel }: DrawingCanvasProps) {
  const ToolControl = drawingViewModel.currentTool?.toolControl;

  return (
    <div className="w-full h-full">
      <Canvas>
        <DrawingView drawingViewModel={drawingViewModel} />
        {ToolControl && <ToolControl />}
      </Canvas>
    </div>
  );
}

export default DrawingCanvas;
