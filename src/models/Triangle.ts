import { Point } from "./Point";
import { Shape, ShapeType } from "./Shape";

export class Triangle implements Shape {
  private _points: Point[];
  type = ShapeType.Triangle;
  id: string;

  constructor(points: Point[], id: string) {
    if (points.length !== 3) {
      throw new Error("Triangle must have exactly 3 points");
    }

    this.id = id;
    this._points = points;
  }

  get points() {
    return [...this._points];
  }

  set points(points: Point[]) {
    if (points.length !== 3) {
      throw new Error("Triangle must have exactly 3 points");
    }
    this._points = points;
  }
}
