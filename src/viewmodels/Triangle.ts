import { makeObservable, override } from "mobx";
import { Triangle } from "../models/Triangle";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import * as THREE from "three";

class TriangleViewModel extends ShapeViewModel {
  private _triangle: Triangle;

  constructor(triangle: Triangle) {
    super();
    this._triangle = triangle;

    makeObservable(this, {
      // Inherited properties
      type: override,
      id: override,
      model: override,
      toShape: override,
      // Own properties
    });

    this.setColor(0x489048);
  }

  get model(): Shape {
    return this._triangle;
  }

  get type(): ShapeType {
    return this._triangle.type;
  }

  get id(): string {
    return this._triangle.id;
  }

  toShape(): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(this.getPoints()[0].x, this.getPoints()[0].y);
    shape.lineTo(this.getPoints()[1].x, this.getPoints()[1].y);
    shape.lineTo(this.getPoints()[2].x, this.getPoints()[2].y);
    shape.lineTo(this.getPoints()[0].x, this.getPoints()[0].y);

    return shape;
  }

  getPoints() {
    return this._triangle.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._triangle.points = points;
  }
}

export default TriangleViewModel;
