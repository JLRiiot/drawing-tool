import { action, computed, makeObservable, observable, override } from "mobx";
import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import { Hexagon } from "../models/Hexagon";

class HexagonViewModel extends ShapeViewModel {
  private _hexagon: Hexagon;

  constructor(hexagon: Hexagon) {
    super();
    this._hexagon = hexagon;

    makeObservable(this, {
      // Inherited properties
      type: override,
      id: override,
      model: override,
      toShape: override,
      // Own properties
      setPoints: action.bound,
    });

    this.setColor(0x904848);
  }

  get model(): Shape {
    return this._hexagon;
  }

  get type(): ShapeType {
    return this._hexagon.type;
  }

  get id(): string {
    return this._hexagon.id;
  }

  get actionPoints() {
    return this._hexagon.points.map(
      (point) => new THREE.Vector3(point.x, point.y, point.z)
    );
  }

  toShape(): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(this.actionPoints[0].x, this.actionPoints[0].y);
    shape.lineTo(this.actionPoints[1].x, this.actionPoints[1].y);
    shape.lineTo(this.actionPoints[2].x, this.actionPoints[2].y);
    shape.lineTo(this.actionPoints[3].x, this.actionPoints[3].y);
    shape.lineTo(this.actionPoints[4].x, this.actionPoints[4].y);
    shape.lineTo(this.actionPoints[5].x, this.actionPoints[5].y);
    shape.lineTo(this.actionPoints[0].x, this.actionPoints[0].y);

    return shape;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._hexagon.points = points;
  }
}

export default HexagonViewModel;
