import React from "react";
import {
  AiOutlineSelect,
  AiOutlineDrag,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsTriangle, BsSquare, BsHexagon } from "react-icons/bs";
import VerticalToolBar from "../atoms/VerticalToolbar";
import Tool from "../molecules/Tool";

function DrawingTools() {
  return (
    <VerticalToolBar>
      <Tool icon={AiOutlineSelect} toolName="Selection" />
      <Tool icon={AiOutlineDrag} toolName="Move" />
      <Tool icon={AiOutlineCloseCircle} toolName="Closest point" />
      <Tool icon={BsTriangle} toolName="Triangle" />
      <Tool icon={BsSquare} toolName="Square" />
      <Tool icon={BsHexagon} toolName="Hexagon" />
    </VerticalToolBar>
  );
}

export default DrawingTools;
