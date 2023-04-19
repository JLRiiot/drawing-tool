import { Shape, ShapeType } from "../models/Shape";
import { Triangle } from "../models/Triangle";
import { Line } from "../models/Line";
import LineViewModel from "./Line";
import TriangleViewModel from "./Triangle";
import { Square } from "../models/Square";
import SquareViewModel from "./Square";
import { Hexagon } from "../models/Hexagon";
import HexagonViewModel from "./Hexagon";

export class ShapeViewModelFactory {
  static createShapeViewModel(shape: Shape) {
    switch (shape.type) {
      case ShapeType.Triangle:
        const triangle = shape as Triangle;
        return new TriangleViewModel(triangle);
      case ShapeType.Line:
        const line = shape as Line;
        return new LineViewModel(line);
      case ShapeType.Square:
        const square = shape as Square;
        return new SquareViewModel(square);
      case ShapeType.Hexagon:
        const hexsagon = shape as Hexagon;
        return new HexagonViewModel(hexsagon);
      default:
        throw new Error("Unknown shape type");
    }
  }
}
