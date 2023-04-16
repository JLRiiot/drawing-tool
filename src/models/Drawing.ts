import { Shape } from "./Shape";

export class Drawing {
  private _shapes: Shape[] = [];

  constructor(shapes: Shape[] = []) {
    this._shapes = shapes;
  }

  get shapes(): Shape[] {
    return [...this._shapes];
  }

  addShape(shape: Shape): void {
    this._shapes.push(shape);
  }

  removeShape(shape: Shape): void {
    const index = this._shapes.indexOf(shape);
    if (index >= 0) {
      this._shapes.splice(index, 1);
    }
  }
}
