import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import SquareViewModel from "../Square";
import { Square } from "../../models/Square";

export class SquareToolViewModel extends ToolViewModel {
  private _squareViewModel: SquareViewModel | null = null;

  handlePointerDown(pointer: THREE.Vector3): void {
    const triangleEdgeSize = 10;

    const squareeVertices = this.createSquare(pointer, triangleEdgeSize);

    const triangle = new Square(Date.now().toString(), squareeVertices);
    this._squareViewModel = new SquareViewModel(triangle);

    this.drawing.addShape(this._squareViewModel);
  }

  handlePointerMove(): void {
    // console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }

  handlePointerUp(pointer: THREE.Vector3, group: THREE.Scene): void {
    this._squareViewModel = null;
  }

  toolControl(): JSX.Element | null {
    return null;
  }

  private createSquare(centroid: THREE.Vector3, sideLength = 2) {
    const halfBase = sideLength / 2;

    const pointA = new THREE.Vector3(
      centroid.x + halfBase,
      centroid.y + halfBase,
      centroid.z
    );
    const pointB = new THREE.Vector3(
      centroid.x - halfBase,
      centroid.y + halfBase,
      centroid.z
    );
    const pointC = new THREE.Vector3(
      centroid.x - halfBase,
      centroid.y - halfBase,
      centroid.z
    );
    const pointD = new THREE.Vector3(
      centroid.x + halfBase,
      centroid.y - halfBase,
      centroid.z
    );

    return [pointA, pointB, pointC, pointD];
  }
}
