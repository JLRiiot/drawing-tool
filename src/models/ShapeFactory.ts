import { Shape } from "./Shape";
import { Triangle } from "./Triangle";

// @TODO: This is just for the challenge, the factory might not be the best solution.
class ShapeFactory {
  static createShape(type: string, shapeJson: any): Shape {
    switch (type) {
      case "triangle":
        const points = shapeJson.points.map((point: any) => {
          return { x: point.x, y: point.y, z: point.z };
        });

        return new Triangle(points, shapeJson.id);
      default:
        throw new Error("Unknown shape type");
    }
  }
}

export default ShapeFactory;
