import { Point } from "./Point";
import { Shape } from "./Shape";

export class Hexagon {
  private _points: Point[];
  type = "hexagon";

  constructor(points: Point[]) {
    if (points.length !== 6) {
      throw new Error("Hexagon must have exactly 6 points");
    }
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
