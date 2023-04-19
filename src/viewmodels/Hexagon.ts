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
      getPoints: observable,
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

  toShape(): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(this.getPoints()[0].x, this.getPoints()[0].y);
    shape.lineTo(this.getPoints()[1].x, this.getPoints()[1].y);
    shape.lineTo(this.getPoints()[2].x, this.getPoints()[2].y);
    shape.lineTo(this.getPoints()[3].x, this.getPoints()[3].y);
    shape.lineTo(this.getPoints()[4].x, this.getPoints()[4].y);
    shape.lineTo(this.getPoints()[5].x, this.getPoints()[5].y);
    shape.lineTo(this.getPoints()[0].x, this.getPoints()[0].y);

    return shape;
  }

  getPoints() {
    return this._hexagon.points;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._hexagon.points = points;
  }
}

export default HexagonViewModel;
