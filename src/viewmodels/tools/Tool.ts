import * as THREE from "three";
import { DrawingViewModel } from "../Drawing";

export abstract class ToolViewModel {
  constructor(protected drawing: DrawingViewModel) {}

  abstract handlePointerDown(pointer: THREE.Vector3, group: THREE.Group): void;
  abstract handlePointerMove(pointer: THREE.Vector3, group: THREE.Group): void;
  abstract handlePointerUp(pointer: THREE.Vector3, group: THREE.Group): void;
  abstract toolControl(): JSX.Element | null;
}
