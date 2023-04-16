import React, { useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import ShapeFactory from "./shapes/ShapeFactory";
import { ShapeViewModel } from "../../../viewmodels/ShapeViewModel";

export interface DrawingViewProps {
  drawingViewModel: DrawingViewModel;
}

const DrawingView = observer(({ drawingViewModel }: DrawingViewProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  const handleOnPointerMissed = (event: any) => {
    console.debug("DrawingView.handleOnPointerMissed", event);

    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerDown(
        event,
        groupRef.current,
        camera,
        pointer
      );
    }
  };

  const handlePointerDown = (event: any) => {
    console.debug("DrawingView.handlePointerDown", event);
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerDown(
        event,
        groupRef.current,
        camera,
        pointer
      );
    }
  };

  const handlePointerMove = (event: any) => {
    console.debug("DrawingView.handlePointerMove", event);
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerMove(
        event,
        groupRef.current,
        camera,
        pointer
      );
    }
  };

  const handlePointerUp = (event: any) => {
    if (drawingViewModel.currentTool && groupRef.current) {
      drawingViewModel.currentTool.handlePointerMove(
        event,
        groupRef.current,
        camera,
        pointer
      );
    }
  };

  const shapes = drawingViewModel.shapes.map(
    (shapeViewModel: ShapeViewModel) => {
      console.debug("DrawingView.shape", shapeViewModel);
      const ShapeComponent = ShapeFactory.getShapeView(shapeViewModel.type);

      return (
        <ShapeComponent key={shapeViewModel.id} viewModel={shapeViewModel} />
      );
    }
  );

  return (
    <scene
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerMissed={handleOnPointerMissed}
    >
      <group ref={groupRef}>{shapes}</group>
    </scene>
  );
});

export default DrawingView;
