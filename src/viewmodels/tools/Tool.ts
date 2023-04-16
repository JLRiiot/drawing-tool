import * as THREE from "three";
import { DrawingViewModel } from "../Drawing";

export abstract class ToolViewModel {
  constructor(protected drawing: DrawingViewModel) {}

  abstract handlePointerDown(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group
  ): void;
  abstract handlePointerMove(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group
  ): void;
  abstract handlePointerUp(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group
  ): void;
}
