// @TODO: Shape might not be the best abstraction.
export interface Shape {
  get id(): string;
  set id(id: string);
  get type(): ShapeType;
}

export enum ShapeType {
  Triangle = "triangle",
  Square = "square",
  Hexagon = "hexagon",
  Circle = "circle",
  Polygon = "polygon",
  Draft = "draft",
  Line = "line",
  TargetIndicator = "target-indicator",
}
