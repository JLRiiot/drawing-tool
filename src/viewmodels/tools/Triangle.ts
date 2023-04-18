import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { Triangle } from "../../models/Triangle";
import TriangleViewModel from "../Triangle";

export class TriangleToolViewModel extends ToolViewModel {
  private _triangleViewModel: TriangleViewModel | null = null;

  handlePointerDown(pointer: THREE.Vector3, group: THREE.Group): void {
    const triangleEdgeSize = 10;

    const triangleVertices = this.createEquilateralTrianglePoints(
      pointer,
      triangleEdgeSize
    );

    const triangle = new Triangle(triangleVertices, Date.now().toString());
    this._triangleViewModel = new TriangleViewModel(triangle);

    this.drawing.addShape(this._triangleViewModel);
  }

  handlePointerMove(pointer: THREE.Vector3, group: THREE.Group): void {
    // console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }

  handlePointerUp(pointer: THREE.Vector3, group: THREE.Group): void {
    this._triangleViewModel = null;
  }

  toolControl(): JSX.Element | null {
    return null;
  }

  private createEquilateralTrianglePoints(
    centroid: THREE.Vector3,
    sideLength = 2
  ) {
    const halfBase = sideLength / 2;

    const pointA = new THREE.Vector3(
      centroid.x + halfBase,
      centroid.y + halfBase,
      centroid.z
    );
    const pointB = new THREE.Vector3(
      centroid.x - halfBase,
      centroid.y,
      centroid.z
    );
    const pointC = new THREE.Vector3(
      centroid.x + halfBase,
      centroid.y - halfBase,
      centroid.z
    );

    return [pointA, pointB, pointC];
  }
}
