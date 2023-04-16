import { action, makeObservable, observable } from "mobx";
import { Triangle } from "../models/Triangle";

class TriangleViewModel {
  private _triangle: Triangle;

  constructor(triangle: Triangle) {
    this._triangle = triangle;

    makeObservable(this, {
      points: observable,
      setPoints: action,
    });
  }

  get points() {
    return this._triangle.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._triangle.points = points;
  }
}

export default TriangleViewModel;
