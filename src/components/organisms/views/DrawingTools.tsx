import React from "react";
import {
  AiOutlineSelect,
  AiOutlineDrag,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsSquare, BsHexagon } from "react-icons/bs";
import VerticalToolBar from "../../atoms/VerticalToolbar";
import Tool from "../../molecules/Tool";
import TriangleToolView from "./tools/Triangle";
import { DrawingViewModel } from "../../../viewmodels/Drawing";

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
      <TriangleToolView drawingViewModel={drawingViewModel}></TriangleToolView>
      <Tool icon={BsSquare} toolName="Square" />
      <Tool icon={BsHexagon} toolName="Hexagon" />
    </VerticalToolBar>
  );
}

export default DrawingTools;
