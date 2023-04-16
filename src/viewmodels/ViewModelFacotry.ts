import { Shape, ShapeType } from "../models/Shape";
import { Triangle } from "../models/Triangle";
import TriangleViewModel from "./Triangle";

export class ShapeViewModelFactory {
  static createShapeViewModel(shape: Shape) {
    switch (shape.type) {
      case ShapeType.Triangle:
        const triangle = shape as Triangle;
        return new TriangleViewModel(triangle);
      default:
        throw new Error("Unknown shape type");
    }
  }
}
