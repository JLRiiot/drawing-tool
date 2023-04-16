import { Point } from "./Point";

export class Polygon {
  private _points: Point[];

  constructor(points: Point[]) {
    if (points.length < 3) {
      throw new Error("Polygon must have at least 3 points");
    }
    this._points = points;
  }

  get points() {
    return [...this._points];
  }

  set points(points: Point[]) {
    if (points.length < 3) {
      throw new Error("Polygon must have at least 3 points");
    }
    this._points = points;
  }
}
