// @TODO: Shape might not be the best abstraction.
export interface Shape {
  id: string;
  type: ShapeType;
}

export enum ShapeType {
  Triangle = "triangle",
  Square = "square",
  Hexagon = "hexagon",
  Circle = "circle",
  Polygon = "polygon",
}
