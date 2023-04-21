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

  get actionPoints() {
    return this.triangle.points.map(
      (point) => new THREE.Vector3(point.x, point.y, point.z)
    );
  }

  setPoints(points: { x: number; y: number; z: number }[]) {
    this.triangle.points = points;
  }
}

export default TriangleViewModel;
