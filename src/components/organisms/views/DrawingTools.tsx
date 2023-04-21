import React from "react";
import { AiOutlineDrag, AiOutlineCloseCircle } from "react-icons/ai";
import VerticalToolBar from "../../atoms/VerticalToolbar";
import Tool from "../../molecules/Tool";
import TriangleToolView from "./tools/Triangle";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import LineToolView from "./tools/Line";
import SquareToolView from "./tools/Square";
import HexagonToolView from "./tools/Hexagon";
import SelectionToolView from "./tools/Selection";
import MoveToolView from "./tools/Move";

export interface DrawingToolsProps {
  drawingViewModel: DrawingViewModel;
}

function DrawingTools({ drawingViewModel }: DrawingToolsProps) {
  return (
    <VerticalToolBar>
      <SelectionToolView drawingViewModel={drawingViewModel} />
      <MoveToolView drawingViewModel={drawingViewModel} />
      <Tool icon={AiOutlineCloseCircle} toolName="Closest point" />
      {/* <Tool icon={BsTriangle} toolName="Triangle" /> */}
      <LineToolView drawingViewModel={drawingViewModel}></LineToolView>
      <TriangleToolView drawingViewModel={drawingViewModel}></TriangleToolView>
      <SquareToolView drawingViewModel={drawingViewModel}></SquareToolView>
      <HexagonToolView drawingViewModel={drawingViewModel} />
    </VerticalToolBar>
  );
}

export default DrawingTools;
