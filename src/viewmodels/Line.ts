import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Line } from "../models/Line";
import { Shape, ShapeType } from "../models/Shape";
import { action, makeObservable, observable, override } from "mobx";

class LineViewModel extends ShapeViewModel {
  private _line: Line;
  public start: THREE.Vector3;
  public end: THREE.Vector3;

  constructor(line: Line) {
    super();

    this._line = line;

    makeObservable(this, {
      // Inherited properties
      type: override,
      id: override,
      model: override,
      toShape: override,
      // Own properties
      setEnd: action,
      setStart: action,
      start: observable,
      end: observable,
    });

    this.setColor(0xcc9048);

    this.start = new THREE.Vector3(
      line.points[0].x,
      line.points[0].y,
      line.points[0].z
    );
    this.end = new THREE.Vector3(
      line.points[1].x,
      line.points[1].y,
      line.points[1].z
    );
  }

  get model(): Shape {
    return this._line;
  }

  get type(): ShapeType {
    return this._line.type;
  }

  get id(): string {
    return this._line.id;
  }

  get actionPoints() {
    return [this.start, this.end];
  }

  fromMesh(mesh: THREE.Mesh): void {
    throw new Error("Method not implemented.");
  }

  setStart(start: THREE.Vector3) {
    this.start = new THREE.Vector3(start.x, start.y, start.z);
    this._line.points[0].x = start.x;
    this._line.points[0].y = start.y;
    this._line.points[0].z = start.z;
  }

  setEnd(end: THREE.Vector3) {
    this.end = new THREE.Vector3(end.x, end.y, end.z);
    this._line.points[1].x = end.x;
    this._line.points[1].y = end.y;
    this._line.points[1].z = end.z;
  }

  toShape(): THREE.Line {
    throw new Error("Method not implemented.");
  }

  getClosestPointTo(point: THREE.Vector3): THREE.Vector3 {
    const segments: [THREE.Vector3, THREE.Vector3][] = [[this.start, this.end]];

    let closestPoint: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    let closestDistance = Infinity;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const line = new THREE.Line3(segment[0], segment[1]);

      const tempPoint = line.closestPointToPoint(point, true, closestPoint);
      const tempDistance = point.distanceTo(closestPoint);

      if (tempDistance < closestDistance) {
        closestDistance = tempDistance;
        closestPoint = tempPoint;
      }
    }

    return closestPoint;
  }

  moveDelta(delta: THREE.Vector3): void {
    this.setStart(
      new THREE.Vector3(
        this.start.x + delta.x,
        this.start.y + delta.y,
        this.start.z + delta.z
      )
    );
    this.setEnd(
      new THREE.Vector3(
        this.end.x + delta.x,
        this.end.y + delta.y,
        this.end.z + delta.z
      )
    );
  }
}

export function isLineViewModel(
  shapeViewModel: ShapeViewModel
): shapeViewModel is LineViewModel {
  return shapeViewModel.type === ShapeType.Line;
}

export default LineViewModel;
