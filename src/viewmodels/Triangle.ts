import { action, makeObservable, observable, override } from "mobx";
import { Triangle } from "../models/Triangle";
import { ShapeViewModel } from "./ShapeViewModel";
import { Shape, ShapeType } from "../models/Shape";
import * as THREE from "three";

class TriangleViewModel extends ShapeViewModel {
  public triangle: Triangle;

  constructor(triangle: Triangle) {
    super();
    this.triangle = triangle;

    makeObservable(this, {
      // Inherited properties
      type: override,
      id: override,
      model: override,
      toShape: override,
      // Own properties
      fromMesh: override,
      triangle: observable,
      setPoints: action.bound,
    });

    this.setColor(0x489048);
  }

  get model(): Shape {
    return this.triangle;
  }

  get type(): ShapeType {
    return this.triangle.type;
  }

  get id(): string {
    return this.triangle.id;
  }

  get actionPoints() {
    return this.triangle.points.map(
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
    shape.lineTo(this.actionPoints[0].x, this.actionPoints[0].y);

    return shape;
  }

  getClosestPointTo(point: THREE.Vector3): THREE.Vector3 {
    let segments: [THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i < this.triangle.points.length; i++) {
      const start = this.triangle.points[i];
      const end = this.triangle.points[(i + 1) % this.triangle.points.length];

      segments.push([
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(end.x, end.y, end.z),
      ]);
    }

    let closestPoint: THREE.Vector3 = new THREE.Vector3();
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

  setPoints(points: { x: number; y: number; z: number }[]) {
    this.triangle.points = points;
  }

  moveDelta(delta: THREE.Vector3): void {
    this.setPoints(
      this.triangle.points.map((point) => {
        return {
          x: point.x + delta.x,
          y: point.y + delta.y,
          z: point.z + delta.z,
        };
      })
    );
  }
}

export default TriangleViewModel;
