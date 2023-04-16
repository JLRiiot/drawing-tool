import React, { useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { Canvas } from "@react-three/fiber";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import { Shape } from "../../../models/Shape";
import ShapeFactory from "./shapes/ShapeFactory";
import { ShapeViewModelFactory } from "../../../viewmodels/ViewModelFacotry";

export interface DrawingViewProps {
  drawingViewModel: DrawingViewModel;
}

const DrawingView = observer(({ drawingViewModel }: DrawingViewProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const handlePointerDown = (event: any) => {
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerDown(event, groupRef.current);
    }
  };

  const handlePointerMove = (event: any) => {
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerMove(event, groupRef.current);
    }
  };

  const handlePointerUp = (event: any) => {
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerUp(event, groupRef.current);
    }
  };

  // @TODO: Create a ShapeViewModel and use it instead of Shape
  const shapes = drawingViewModel.shapes.map((shape: Shape) => {
    const ShapeComponent = ShapeFactory.getShapeView(shape.type);
    const shapeViewModel = ShapeViewModelFactory.createShapeViewModel(shape);

    return <ShapeComponent key={shape.id} shapeViewModel={shapeViewModel} />;
  });

  return (
    <div
      className="w-full h-full"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Canvas>
        <group ref={groupRef}>{shapes}</group>
      </Canvas>
    </div>
  );
});

export default DrawingView;
