import { Point } from "./Point";
import { Shape, ShapeType } from "./Shape";

export class Line implements Shape {
  id: string;
  type: ShapeType = ShapeType.Line;
  private _points: Point[] = [];
  private _thickness: number = 1;

  constructor(id: string) {
    this.id = id;
  }

  get points(): Point[] {
    return this._points;
  }

  set points(points: Point[]) {
    if (points.length < 2) throw new Error("Line must have at least 2 points");

    this._points = points;
  }

  get thickness(): number {
    return this._thickness;
  }

  set thickness(thickness: number) {
    this._thickness = thickness;
  }
}
