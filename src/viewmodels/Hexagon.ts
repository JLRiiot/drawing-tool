import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import { Hexagon } from "../models/Hexagon";

class HexagonViewModel implements ShapeViewModel {
  private _hexagon: Hexagon;
  private _color: number = 0x904848;

  constructor(triangle: Hexagon) {
    this._hexagon = triangle;

    makeAutoObservable(this);
  }

  get model(): Shape {
    return this._hexagon;
  }

  get type(): ShapeType {
    return this._hexagon.type;
  }

  get id(): string {
    return this._hexagon.id;
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
    shape.lineTo(this.points[4].x, this.points[4].y);
    shape.lineTo(this.points[5].x, this.points[5].y);
    shape.lineTo(this.points[0].x, this.points[0].y);

    return shape;
  }

  get points() {
    return this._hexagon.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._hexagon.points = points;
  }
}

export default HexagonViewModel;
