import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import ShapeFactory from "./shapes/ShapeFactory";
import { ShapeViewModel } from "../../../viewmodels/ShapeViewModel";

export interface DrawingViewProps {
  drawingViewModel: DrawingViewModel;
}

const domCoordsToCameraCoords = (
  domX: number,
  domY: number,
  domElemebt: HTMLElement,
  camera: THREE.Camera
) => {
  const domRect = domElemebt.getBoundingClientRect();

  if (!domRect)
    throw new Error(
      "Could not get bounding rect, when calculating mouse position"
    );

  const mouseX = domX - domRect?.left;
  const mouseY = domY - domRect?.top;
  const ndcX = (mouseX / domRect?.width) * 2 - 1;
  const ndcY = -(mouseY / domRect?.height) * 2 + 1;

  const mouse = new THREE.Vector3(ndcX, ndcY, 0.5);
  mouse.unproject(camera);
  mouse.setZ(0.5);

  return mouse;
};

const DrawingView = observer(({ drawingViewModel }: DrawingViewProps) => {
  const sceneRef = useRef<THREE.Scene>(null);
  const defaultCamera = useThree((state) => state.camera);
  const events = useThree((state) => state.events);
  // This is required to attach to the correct mouse events
  const domElement = events.connected as HTMLElement | undefined;

  const handlePointerDown = useCallback(
    (event: any) => {
      event.preventDefault();

      if (sceneRef.current !== null && drawingViewModel.currentTool) {
        const mouse = domCoordsToCameraCoords(
          event.clientX,
          event.clientY,
          domElement!,
          defaultCamera
        );

        drawingViewModel.currentTool.handlePointerDown(
          mouse,
          sceneRef.current,
          defaultCamera
        );
      }
    },
    [domElement, defaultCamera, drawingViewModel, sceneRef]
  );

  const handlePointerMove = useCallback(
    (event: any) => {
      event.preventDefault();

      if (sceneRef.current !== null && drawingViewModel.currentTool) {
        const mouse = domCoordsToCameraCoords(
          event.clientX,
          event.clientY,
          domElement!,
          defaultCamera
        );

        drawingViewModel.currentTool.handlePointerMove(
          mouse,
          sceneRef.current,
          defaultCamera
        );
      }
    },
    [domElement, defaultCamera, drawingViewModel, sceneRef]
  );

  const handlePointerUp = useCallback(
    (event: any) => {
      event.preventDefault();

      if (sceneRef.current !== null && drawingViewModel.currentTool) {
        const mouse = domCoordsToCameraCoords(
          event.clientX,
          event.clientY,
          domElement!,
          defaultCamera
        );

        drawingViewModel.currentTool.handlePointerUp(
          mouse,
          sceneRef.current,
          defaultCamera
        );
      }
    },
    [domElement, defaultCamera, drawingViewModel, sceneRef]
  );

  useEffect(() => {
    if (domElement) {
      domElement.addEventListener("pointerdown", handlePointerDown);
      domElement.addEventListener("pointermove", handlePointerMove);
      domElement.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      if (domElement) {
        domElement.removeEventListener("pointerdown", handlePointerDown);
        domElement.removeEventListener("pointermove", handlePointerMove);
        domElement.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, [domElement, handlePointerDown, handlePointerMove, handlePointerUp]);

  const shapes = drawingViewModel.shapes.map(
    (shapeViewModel: ShapeViewModel) => {
      const ShapeComponent = ShapeFactory.getShapeView(shapeViewModel.type);

      return (
        <ShapeComponent key={shapeViewModel.id} viewModel={shapeViewModel} />
      );
    }
  );
  const toolsOverlayShapes = drawingViewModel.toolOverlayedShapes.map(
    (shapeViewModel: ShapeViewModel) => {
      const ShapeComponent = ShapeFactory.getShapeView(shapeViewModel.type);

      return (
        <ShapeComponent key={shapeViewModel.id} viewModel={shapeViewModel} />
      );
    }
  );

  return (
    <scene ref={sceneRef}>
      <group name={"drawing-layer"}>{shapes}</group>
      <group name={"tool-overlay-layer"}>{toolsOverlayShapes}</group>
    </scene>
  );
});

export default DrawingView;
