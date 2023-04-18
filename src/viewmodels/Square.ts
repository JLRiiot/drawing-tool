import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import { Square } from "../models/Square";

class SquareViewModel implements ShapeViewModel {
  private _square: Square;
  private _color: number = 0x000000;

  constructor(triangle: Square) {
    this._square = triangle;

    makeAutoObservable(this);
  }

  get model(): Shape {
    return this._square;
  }

  get type(): ShapeType {
    return this._square.type;
  }

  get id(): string {
    return this._square.id;
  }

  getColor(): number {
    return this._color;
  }

  setColor(color: number): void {
    this._color = color;
  }

  toShape(): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(this.points[0].x, this.points[0].y);
    shape.lineTo(this.points[1].x, this.points[1].y);
    shape.lineTo(this.points[2].x, this.points[2].y);
    shape.lineTo(this.points[3].x, this.points[3].y);
    shape.lineTo(this.points[0].x, this.points[0].y);

    return shape;
  }

  get points() {
    return this._square.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._square.points = points;
  }
}

export default SquareViewModel;
