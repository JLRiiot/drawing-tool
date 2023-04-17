import * as THREE from "three";
import { ShapeType } from "../models/Shape";

export interface ShapeViewModel {
  get type(): ShapeType;
  get id(): string;
  toShape(): THREE.Shape | THREE.Line;
}
