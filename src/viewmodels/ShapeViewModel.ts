import * as THREE from "three";
import { Shape, ShapeType } from "../models/Shape";

export interface ShapeViewModel {
  get type(): ShapeType;
  get id(): string;
  get model(): Shape;
  getColor(): number;
  setColor(color: number): void;
  toShape(): THREE.Shape | THREE.Line;
}
