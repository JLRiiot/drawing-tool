import { ShapeType } from "../../../../models/Shape";
import HexagonView from "./Hexagon";
import LineView from "./Line";
import SquareView from "./Square";
import TriangleView from "./Triangle";

class ShapeViewFactory {
  static getShapeView(shape: ShapeType): React.FC<any> {
    switch (shape) {
      case ShapeType.Triangle:
        return TriangleView;
      case ShapeType.Line:
        return LineView;
      case ShapeType.Square:
        return SquareView;
      case ShapeType.Hexagon:
        return HexagonView;
      default:
        return () => <div>Shape not found</div>;
    }
  }
}

export default ShapeViewFactory;
