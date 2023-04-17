import { Shape, ShapeType } from "../models/Shape";
import { Triangle } from "../models/Triangle";
import { Line } from "../models/Line";
import LineViewModel from "./Line";
import TriangleViewModel from "./Triangle";

export class ShapeViewModelFactory {
  static createShapeViewModel(shape: Shape) {
    switch (shape.type) {
      case ShapeType.Triangle:
        const triangle = shape as Triangle;
        return new TriangleViewModel(triangle);
      case ShapeType.Line:
        const line = shape as Line;
        return new LineViewModel(line);
      default:
        throw new Error("Unknown shape type");
    }
  }
}
