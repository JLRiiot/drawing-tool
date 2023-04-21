import { action, makeObservable, override } from "mobx";
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
    shape.lineTo(this.actionPoints[4].x, this.actionPoints[4].y);
    shape.lineTo(this.actionPoints[5].x, this.actionPoints[5].y);
    shape.lineTo(this.actionPoints[0].x, this.actionPoints[0].y);

    return shape;
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this._hexagon.points = points;
  }

  getClosestPointTo(point: THREE.Vector3): THREE.Vector3 {
    let segments: [THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i < this._hexagon.points.length; i++) {
      const start = this._hexagon.points[i];
      const end = this._hexagon.points[(i + 1) % this._hexagon.points.length];

      segments.push([
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(end.x, end.y, end.z),
      ]);
    }

    let closestPoint: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    let closestDistance = Infinity;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const line = new THREE.Line3(segment[0], segment[1]);

      const tempClosestPoint = new THREE.Vector3();
      line.closestPointToPoint(point, true, tempClosestPoint);
      const tempDistance = tempClosestPoint.distanceTo(point);

      if (tempDistance < closestDistance) {
        closestDistance = tempDistance;
        closestPoint = tempClosestPoint;
      }
    }

    return closestPoint;
  }

  moveDelta(delta: THREE.Vector3): void {
    this.setPoints(
      this._hexagon.points.map((point) => {
        return {
          x: point.x + delta.x,
          y: point.y + delta.y,
          z: point.z + delta.z,
        };
      })
    );
  }
}

export default HexagonViewModel;
