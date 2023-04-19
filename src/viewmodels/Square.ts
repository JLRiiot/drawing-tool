import { action, makeObservable, observable, override } from "mobx";
import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import { Square } from "../models/Square";

class SquareViewModel extends ShapeViewModel {
  private _square: Square;

  constructor(triangle: Square) {
    super();
    this._square = triangle;

    makeObservable(this, {
      // Inherited properties
      type: override,
      id: override,
      model: override,
      toShape: override,
      // Own properties
      getPoints: observable,
      setPoints: action.bound,
    });

    this.setColor(0x484890);
  }

  get model(): Shape {
    return this._square;
  }

  get type(): ShapeType {
    return this._square.type;
  }

  get id(): string {
    return this._square.id;
  }

  toShape(): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(this.getPoints()[0].x, this.getPoints()[0].y);
    shape.lineTo(this.getPoints()[1].x, this.getPoints()[1].y);
    shape.lineTo(this.getPoints()[2].x, this.getPoints()[2].y);
    shape.lineTo(this.getPoints()[3].x, this.getPoints()[3].y);
    shape.lineTo(this.getPoints()[0].x, this.getPoints()[0].y);

    return shape;
  }

  getPoints() {
    return this._square.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._square.points = points;
  }
}

export default SquareViewModel;
