import { makeAutoObservable } from "mobx";
import { Triangle } from "../models/Triangle";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape } from "three";

class TriangleViewModel implements ShapeViewModel {
  private _triangle: Triangle;

  constructor(triangle: Triangle) {
    this._triangle = triangle;

    makeAutoObservable(this);
  }

  get type(): string {
    return this._triangle.type;
  }

  get id(): string {
    return this._triangle.id;
  }

  toShape(): THREE.Shape {
    const shape = new Shape();
    shape.moveTo(this.points[0].x, this.points[0].y);
    shape.lineTo(this.points[1].x, this.points[1].y);
    shape.lineTo(this.points[2].x, this.points[2].y);
    shape.lineTo(this.points[0].x, this.points[0].y);

    return shape;
  }

  get points() {
    return this._triangle.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._triangle.points = points;
  }
}

export default TriangleViewModel;
