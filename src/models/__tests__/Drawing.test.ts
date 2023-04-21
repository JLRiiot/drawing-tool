// Drawing.test.ts
import { Drawing } from "../Drawing";
import { ShapeType } from "../Shape";

describe("Drawing", () => {
  it("should instantiate with an empty array of shapes by default", () => {
    const drawing = new Drawing();
    expect(drawing.shapes.length).toBe(0);
  });

  it("should instantiate with a given array of shapes", () => {
    const shape1 = {
      id: "1",
      type: ShapeType.Hexagon,
    };
    const shape2 = {
      id: "2",
      type: ShapeType.Hexagon,
    };
    const drawing = new Drawing([shape1, shape2]);
    expect(drawing.shapes.length).toBe(2);
  });

  it("should add a shape to the shapes array", () => {
    const drawing = new Drawing();
    const shape = {
      id: "1",
      type: ShapeType.Hexagon,
    };
    drawing.addShape(shape);
    expect(drawing.shapes.length).toBe(1);
    expect(drawing.shapes[0].id).toBe("1");
  });

  it("should remove a shape from the shapes array", () => {
    const shape1 = {
      id: "1",
      type: ShapeType.Hexagon,
    };
    const shape2 = {
      id: "2",
      type: ShapeType.Hexagon,
    };
    const drawing = new Drawing([shape1, shape2]);
    drawing.removeShape(shape1);
    expect(drawing.shapes.length).toBe(1);
    expect(drawing.shapes[0].id).toBe("2");
  });

  it("should not remove a shape if it is not in the shapes array", () => {
    const shape1 = {
      id: "1",
      type: ShapeType.Hexagon,
    };
    const shape2 = {
      id: "2",
      type: ShapeType.Hexagon,
    };
    const shape3 = {
      id: "3",
      type: ShapeType.Hexagon,
    };
    const drawing = new Drawing([shape1, shape2]);
    drawing.removeShape(shape3);
    expect(drawing.shapes.length).toBe(2);
  });
});
