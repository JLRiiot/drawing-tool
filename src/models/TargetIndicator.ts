import { Point } from "./Point";
import { Shape, ShapeType } from "./Shape";

export class TargetIndicator implements Shape {
  constructor(private _id: string, private center: Point) {}

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get type(): ShapeType {
    return ShapeType.TargetIndicator;
  }
}
