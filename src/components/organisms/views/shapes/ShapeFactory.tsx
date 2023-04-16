import TriangleView from "./Triangle";

class ShapeViewFactory {
  static getShapeView(shape: string): React.FC<any> {
    switch (shape) {
      case "triangle":
        return TriangleView;
      default:
        return () => <div>Shape not found</div>;
    }
  }
}

export default ShapeViewFactory;
