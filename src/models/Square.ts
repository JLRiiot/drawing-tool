import { Point } from "./Point";

export class Square {
  private _points: Point[];

  constructor(points: Point[]) {
    if (points.length !== 4) {
      throw new Error("Square must have exactly 4 points");
    }
    this._points = points;
  }

  get points() {
    return [...this._points];
  }

  set points(points: Point[]) {
    if (points.length !== 4) {
      throw new Error("Square must have exactly 4 points");
    }
    this._points = points;
  }
}
