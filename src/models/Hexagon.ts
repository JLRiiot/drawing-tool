import { Point } from "./Point";
import { Shape, ShapeType } from "./Shape";

export class Hexagon implements Shape {
  private _points: Point[];
  private _id: string;

  get id() {
    return this._id;
  }

  get type() {
    return ShapeType.Hexagon;
  }

  constructor(id: string, points: Point[]) {
    if (points.length !== 6) {
      throw new Error("Hexagon must have exactly 6 points");
    }

    this._id = id;
    this._points = points;
  }

  get points() {
    return [...this._points];
  }

  set points(points: Point[]) {
    if (points.length !== 6) {
      throw new Error("Hexagon must have exactly 6 points");
    }
    this._points = points;
  }
}
