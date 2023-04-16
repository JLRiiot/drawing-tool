import * as THREE from "three";

export interface ShapeViewModel {
  get type(): string;
  get id(): string;
  toShape(): THREE.Shape;
}
