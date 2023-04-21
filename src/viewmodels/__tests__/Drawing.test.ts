// DrawingViewModel.test.ts
import { DrawingViewModel } from "../Drawing";
import { ShapeViewModel } from "../ShapeViewModel";
import { Shape } from "../../models/Shape";
import { ToolViewModel } from "../tools/Tool";
import TriangleViewModel from "../Triangle";
import { Triangle } from "../../models/Triangle";

const triangleFixture = new Triangle(
  [
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: 0, y: 1.5, z: 0 },
  ],
  "1"
);
const triangleFixture2 = new Triangle(
  [
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: 0, y: 1.5, z: 0 },
  ],
  "2"
);

describe("DrawingViewModel", () => {
  it("should initialize with an empty array of shapes", () => {
    const drawingViewModel = new DrawingViewModel();
    expect(drawingViewModel.shapes.length).toBe(0);
  });

  it("should add a shape to the shapes array", () => {
    const drawingViewModel = new DrawingViewModel();
    const triangleViewModel = new TriangleViewModel(triangleFixture);
    drawingViewModel.addShape(triangleViewModel);

    expect(drawingViewModel.shapes.length).toBe(1);
    expect(drawingViewModel.shapes[0].id).toBe("1");
  });

  it("should remove a shape from the shapes array", () => {
    const drawingViewModel = new DrawingViewModel();
    const triangleViewModel = new TriangleViewModel(triangleFixture);
    const triangleViewModel2 = new TriangleViewModel(triangleFixture2);

    drawingViewModel.addShape(triangleViewModel);
    drawingViewModel.addShape(triangleViewModel2);

    drawingViewModel.removeShape(triangleFixture);
    expect(drawingViewModel.shapes.length).toBe(1);
    expect(drawingViewModel.shapes[0].id).toBe("2");
  });

  it.todo("should set the current tool");
  it.todo("should set and unset the selected shape");
});
