import React from "react";
import VerticalToolBar from "../../atoms/VerticalToolbar";
import TriangleToolView from "./tools/Triangle";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import SquareToolView from "./tools/Square";
import HexagonToolView from "./tools/Hexagon";
import SelectionToolView from "./tools/Selection";
import MoveToolView from "./tools/Move";
import ProximityToolView from "./tools/Proximity";
// @ignore: uncomment this line to see the line tool and use as debugging
// import LineToolView from "./tools/Line";

export interface DrawingToolsProps {
  drawingViewModel: DrawingViewModel;
}

function DrawingTools({ drawingViewModel }: DrawingToolsProps) {
  return (
    <VerticalToolBar>
      <SelectionToolView drawingViewModel={drawingViewModel} />
      <MoveToolView drawingViewModel={drawingViewModel} />
      <ProximityToolView drawingViewModel={drawingViewModel} />
      {/* <LineToolView drawingViewModel={drawingViewModel}></LineToolView> */}
      <TriangleToolView drawingViewModel={drawingViewModel}></TriangleToolView>
      <SquareToolView drawingViewModel={drawingViewModel}></SquareToolView>
      <HexagonToolView drawingViewModel={drawingViewModel} />
    </VerticalToolBar>
  );
}

export default DrawingTools;
