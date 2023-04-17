import * as THREE from "three";
import { ShapeViewModel } from "./ShapeViewModel";
import { Line } from "../models/Line";
import { ShapeType } from "../models/Shape";
import { makeAutoObservable } from "mobx";

class LineViewModel implements ShapeViewModel {
  private _line: Line;

  constructor(line: Line) {
    this._line = line;

    makeAutoObservable(this);
  }

  get type(): ShapeType {
    return this._line.type;
  }
  get id(): string {
    return this._line.id;
  }

  get points(): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    for (const point of this._line.points) {
      points.push(new THREE.Vector3(point.x, point.y, point.z));
    }

    return points;
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
