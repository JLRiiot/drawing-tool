import * as THREE from "three";
import { DrawingViewModel } from "../Drawing";
import { Size } from "@react-three/fiber";

export abstract class ToolViewModel {
  constructor(protected drawing: DrawingViewModel) {}

  abstract handlePointerDown(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size: Size,
    group: THREE.Group
  ): void;
  abstract handlePointerMove(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size: Size,
    group: THREE.Group
  ): void;
  abstract handlePointerUp(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size: Size,
    group: THREE.Group
  ): void;
  abstract toolControl(): JSX.Element | null;

  protected getMouseCoords(event: any): THREE.Vector2 {
    const x = event.clientX;
    const y = event.clientY;
    return new THREE.Vector2(x, y);
  }

  protected getWorldCoords(
    mouseCoords: THREE.Vector2,
    camera: THREE.Camera,
    size: Size
  ): THREE.Vector3 {
    const { x, y } = mouseCoords;
    const { width, height, top, left } = size;
    const mouse = new THREE.Vector3();
    mouse.setX(((x - left) / width) * 2 - 1);
    mouse.setY(-((y - top) / height) * 2 + 1);
    mouse.setZ(0);

    return mouse;
  }
}
