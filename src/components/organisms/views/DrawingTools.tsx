import React from "react";
import {
  AiOutlineSelect,
  AiOutlineDrag,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsHexagon } from "react-icons/bs";
import VerticalToolBar from "../../atoms/VerticalToolbar";
import Tool from "../../molecules/Tool";
import TriangleToolView from "./tools/Triangle";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import LineToolView from "./tools/Line";
import SquareToolView from "./tools/Square";

export interface DrawingToolsProps {
  drawingViewModel: DrawingViewModel;
}

function DrawingTools({ drawingViewModel }: DrawingToolsProps) {
  return (
    <VerticalToolBar>
      <Tool icon={AiOutlineSelect} toolName="Selection" />
      <Tool icon={AiOutlineDrag} toolName="Move" />
      <Tool icon={AiOutlineCloseCircle} toolName="Closest point" />
      {/* <Tool icon={BsTriangle} toolName="Triangle" /> */}
      <LineToolView drawingViewModel={drawingViewModel}></LineToolView>
      <TriangleToolView drawingViewModel={drawingViewModel}></TriangleToolView>
      <SquareToolView drawingViewModel={drawingViewModel}></SquareToolView>
      <Tool icon={BsHexagon} toolName="Hexagon" />
    </VerticalToolBar>
  );
}

export default DrawingTools;
