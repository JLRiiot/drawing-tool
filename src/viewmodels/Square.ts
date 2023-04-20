import { makeObservable, override } from "mobx";
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
    shape.moveTo(this.actionPoints[0].x, this.actionPoints[0].y);
    shape.lineTo(this.actionPoints[1].x, this.actionPoints[1].y);
    shape.lineTo(this.actionPoints[2].x, this.actionPoints[2].y);
    shape.lineTo(this.actionPoints[3].x, this.actionPoints[3].y);
    shape.lineTo(this.actionPoints[0].x, this.actionPoints[0].y);

    return shape;
  }

  get actionPoints() {
    return this._square.points.map(
      (point) => new THREE.Vector3(point.x, point.y, point.z)
    );
  }
}

export default SquareViewModel;
