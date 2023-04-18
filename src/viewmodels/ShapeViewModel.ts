import * as THREE from "three";
import { Shape, ShapeType } from "../models/Shape";

export interface ShapeViewModel {
  get type(): ShapeType;
  get id(): string;
  get model(): Shape;
  toShape(): THREE.Shape | THREE.Line;
}
