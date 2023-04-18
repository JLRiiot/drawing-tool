import { Point } from "./Point";
import { Shape, ShapeType } from "./Shape";

export class Square implements Shape {
  private _points: Point[];
  private _id: string;

  constructor(id: string, points: Point[]) {
    if (points.length !== 4) {
      throw new Error("Square must have exactly 4 points");
    }

    this._id = id;
    this._points = points;
  }

  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }
  get type(): ShapeType {
    return ShapeType.Square;
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
