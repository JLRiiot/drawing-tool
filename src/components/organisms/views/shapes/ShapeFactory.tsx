import { ShapeType } from "../../../../models/Shape";
import LineView from "./Line";
import TriangleView from "./Triangle";

class ShapeViewFactory {
  static getShapeView(shape: ShapeType): React.FC<any> {
    switch (shape) {
      case ShapeType.Triangle:
        return TriangleView;
      case ShapeType.Line:
        return LineView;
      default:
        return () => <div>Shape not found</div>;
    }
  }
}

export default ShapeViewFactory;
