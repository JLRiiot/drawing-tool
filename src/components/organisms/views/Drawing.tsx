import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { useThree } from "@react-three/fiber";
import { DrawingViewModel } from "../../../viewmodels/Drawing";
import ShapeFactory from "./shapes/ShapeFactory";
import { ShapeViewModel } from "../../../viewmodels/ShapeViewModel";
import { Line } from "../../../models/Line";
import { ShapeViewModelFactory } from "../../../viewmodels/ViewModelFacotry";

export interface DrawingViewProps {
  drawingViewModel: DrawingViewModel;
}

const DrawingView = observer(({ drawingViewModel }: DrawingViewProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const defaultCamera = useThree((state) => state.camera);
  const events = useThree((state) => state.events);
  // This is required to attach to the correct mouse events
  const domElemet = events.connected as HTMLElement | undefined;
  const line = new Line("1");

  const handlePointerDown = useCallback(
    (event: any) => {
      if (drawingViewModel.currentTool && groupRef.current) {
        const rect = domElemet!.getBoundingClientRect();
        const size = rect;
        console.debug("handlePointerDown", {
          event,
          rect: domElemet?.getBoundingClientRect(),
        });

        const { clientX, clientY } = event;
        const mouse = new THREE.Vector3();
        mouse.setX((clientX / size.width) * 2 - 1);
        mouse.setY(-(clientY / size.height) * 2 + 1);
        mouse.setZ(0.5);

        const { x, y, z } = mouse;

        line.points.push({ x, y, z });
        line.points.push({ x: 0, y: 65.4, z: 0 });
        const lineViewModel = ShapeViewModelFactory.createShapeViewModel(line);
        drawingViewModel.addShape(lineViewModel);

        // drawingViewModel.currentTool.handlePointerDown(
        //   event,
        //   defaultCamera,
        //   size,
        //   groupRef.current
        // );
      }
    },
    [drawingViewModel.currentTool, defaultCamera, domElemet]
  );

  const handlePointerMove = useCallback(
    (event: any) => {
      if (drawingViewModel.currentTool && groupRef.current) {
        const rect = domElemet!.getBoundingClientRect();
        const size = rect;
        drawingViewModel.currentTool.handlePointerMove(
          event,
          defaultCamera,
          size,
          groupRef.current
        );
      }
    },
    [drawingViewModel.currentTool, defaultCamera, domElemet]
  );

  const handlePointerUp = useCallback(
    (event: any) => {
      if (drawingViewModel.currentTool && groupRef.current) {
        const rect = domElemet!.getBoundingClientRect();
        const size = rect;

        drawingViewModel.removeShape(line);

        // console.debug("handlePointerUp", { event, size, viewPortSize });
        drawingViewModel.currentTool.handlePointerUp(
          event,
          defaultCamera,
          size,
          groupRef.current
        );
      }
    },
    [drawingViewModel.currentTool, defaultCamera, domElemet]
  );

  useEffect(() => {
    if (domElemet) {
      domElemet.addEventListener("pointerdown", handlePointerDown);
      domElemet.addEventListener("pointermove", handlePointerMove);
      domElemet.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      if (domElemet) {
        domElemet.removeEventListener("pointerdown", handlePointerDown);
        domElemet.removeEventListener("pointermove", handlePointerMove);
        domElemet.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, [domElemet, handlePointerDown, handlePointerMove, handlePointerUp]);
  console.debug("shapes count", drawingViewModel.shapes.length);

  const shapes = drawingViewModel.shapes.map(
    (shapeViewModel: ShapeViewModel) => {
      const ShapeComponent = ShapeFactory.getShapeView(shapeViewModel.type);

      return (
        <ShapeComponent key={shapeViewModel.id} viewModel={shapeViewModel} />
      );
    }
  );

  return (
    <scene>
      <group ref={groupRef}>{shapes}</group>
    </scene>
  );
});

export default DrawingView;
