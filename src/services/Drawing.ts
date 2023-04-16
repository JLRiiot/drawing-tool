import { Drawing } from "../models/Drawing";
import ShapeFactory from "../models/ShapeFactory";

const DRAWING_STORAGE_KEY = "my-drawing";
type MayBeDrawing = Partial<Drawing>;

export class DrawingService {
  static saveDrawing(drawing: Drawing): void {
    localStorage.setItem(DRAWING_STORAGE_KEY, JSON.stringify(drawing));
  }

  static loadDrawing(): Drawing {
    const data = localStorage.getItem(DRAWING_STORAGE_KEY);

    return DrawingService.buildDrawing(JSON.parse(data || "{}"));
  }

  static buildDrawing(jsonData: MayBeDrawing): Drawing {
    const drawing = new Drawing();

    if (jsonData.shapes) {
      for (const shape of jsonData.shapes) {
        const shapeModel = ShapeFactory.createShape(shape.type, shape);
        drawing.addShape(shapeModel);
      }
    }

    return drawing;
  }
}
