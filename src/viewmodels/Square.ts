import { action, makeObservable, override } from "mobx";
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

  fromMesh(mesh: THREE.Mesh): void {
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);

    if (geometry instanceof THREE.BufferGeometry) {
      const positionAttribute = geometry.getAttribute("position");

      // @todo: investigate what is this kind of positionAttribute
      if (positionAttribute instanceof THREE.GLBufferAttribute) {
        return;
      }

      const vertices = [];

      for (let i = 0; i < positionAttribute.count; i++) {
        vertices.push(
          new THREE.Vector3().fromBufferAttribute(positionAttribute, i)
        );
      }
    }
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

  setPoints(points: THREE.Vector3[]): void {
    this._square.points = points.map((p) => ({ x: p.x, y: p.y, z: p.z }));
  }
}

export default SquareViewModel;
