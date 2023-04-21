import * as THREE from "three";
import { ShapeType, Shape } from "../models/Shape";
import { ShapeViewModel } from "./ShapeViewModel";
import { TargetIndicator } from "../models/TargetIndicator";

export class TargetIndicatorViewModel extends ShapeViewModel {
  private _model: TargetIndicator;
  constructor(private _id: string, private center: THREE.Vector3) {
    super();

    this._model = new TargetIndicator(this._id, this.center);
  }

  get type(): ShapeType {
    return ShapeType.TargetIndicator;
  }
  get id(): string {
    return this._id;
  }

  get model(): Shape {
    return this._model;
  }

  get actionPoints(): THREE.Vector3[] {
    return [this.center.clone()];
  }

  toShape(): THREE.Mesh {
    throw new Error("Method not implemented.");
  }

  fromMesh(
    delta: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  ): void {
    throw new Error("Method not implemented.");
  }

  getClosestPointTo(point: THREE.Vector3): THREE.Vector3 {
    return this.center.clone();
  }

  moveDelta(point: THREE.Vector3): void {
    const delta = point.clone().sub(this.center);

    this.center.set(
      this.center.x + delta.x,
      this.center.y + delta.y,
      this.center.z + delta.z
    );
  }
}
