import * as THREE from "three";
import { DrawingViewModel } from "../Drawing";

export abstract class ToolViewModel {
  constructor(protected drawing: DrawingViewModel) {}

  abstract handlePointerDown(
    pointer: THREE.Vector3,
    group: THREE.Group,
    camera: THREE.Camera
  ): void;
  abstract handlePointerMove(
    pointer: THREE.Vector3,
    group: THREE.Group,
    camera: THREE.Camera
  ): void;
  abstract handlePointerUp(
    pointer: THREE.Vector3,
    group: THREE.Scene,
    camera: THREE.Camera
  ): void;
  abstract toolControl(): JSX.Element | null;
}
