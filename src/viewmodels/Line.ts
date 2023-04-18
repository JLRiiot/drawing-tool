import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Line } from "../models/Line";
import { Shape, ShapeType } from "../models/Shape";
import { makeAutoObservable } from "mobx";

class LineViewModel implements ShapeViewModel {
  private _line: Line;
  private _start: THREE.Vector3;
  private _end: THREE.Vector3;
  private _color: number = 0x000000;

  constructor(line: Line) {
    this._line = line;

    this._start = new THREE.Vector3(
      line.points[0].x,
      line.points[0].y,
      line.points[0].z
    );
    this._end = new THREE.Vector3(
      line.points[1].x,
      line.points[1].y,
      line.points[1].z
    );

    makeAutoObservable(this);
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

  getStart(): THREE.Vector3 {
    return this._start;
  }

  setStart(start: THREE.Vector3) {
    this._start.set(start.x, start.y, start.z);
  }

  getEnd(): THREE.Vector3 {
    return this._end;
  }

  setEnd(end: THREE.Vector3) {
    this._end.set(end.x, end.y, end.z);
  }

  setColor(color: number): void {
    this._color = color;
  }

  getColor(): number {
    return this._color;
  }

  toShape(): THREE.Line {
    throw new Error("Method not implemented.");
  }
}

export function isLineViewModel(
  shapeViewModel: ShapeViewModel
): shapeViewModel is LineViewModel {
  return shapeViewModel.type === ShapeType.Line;
}

export default LineViewModel;
