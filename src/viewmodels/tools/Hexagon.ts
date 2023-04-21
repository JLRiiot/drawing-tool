import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import HexagonViewModel from "../Hexagon";
import { Hexagon } from "../../models/Hexagon";

export class HexagonToolViewModel extends ToolViewModel {
  private _squareViewModel: HexagonViewModel | null = null;

  handlePointerDown(pointer: THREE.Vector3): void {
    const triangleEdgeSize = 10;

    const squareeVertices = this.createHexagon(pointer, triangleEdgeSize);

    const triangle = new Hexagon(Date.now().toString(), squareeVertices);
    this._squareViewModel = new HexagonViewModel(triangle);

    this.drawing.addShape(this._squareViewModel);
  }

  handlePointerMove(_pointer: THREE.Vector3): void {
    // console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }

  handlePointerUp(pointer: THREE.Vector3, group: THREE.Scene): void {
    this._squareViewModel = null;
  }

  toolControl(): JSX.Element | null {
    return null;
  }

  private createHexagon(centroid: THREE.Vector3, sideLength = 2) {
    const halfBase = sideLength / 2;
    // 60 degrees in radians
    const thetaRadiants = 60 * (Math.PI / 180);
    /**
     * We will create a regular hexagon with the following points:
     * Regular hexagons have a theta of 60 degrees
     *           A____B
     *         /        \
     *       F/          \C
     *        \          /
     *         \E______D/
     */

    const pointA = new THREE.Vector3(
      centroid.x - halfBase * Math.cos(thetaRadiants),
      centroid.y - halfBase,
      centroid.z
    );
    const pointB = this.rotateVectore3AroundPoint(
      pointA,
      centroid,
      thetaRadiants
    );
    const pointC = this.rotateVectore3AroundPoint(
      pointB,
      centroid,
      thetaRadiants
    );
    const pointD = this.rotateVectore3AroundPoint(
      pointC,
      centroid,
      thetaRadiants
    );
    const pointE = this.rotateVectore3AroundPoint(
      pointD,
      centroid,
      thetaRadiants
    );
    const pointF = this.rotateVectore3AroundPoint(
      pointE,
      centroid,
      thetaRadiants
    );

    return [pointA, pointB, pointC, pointD, pointE, pointF];
  }

  private rotateVectore3AroundPoint(
    vector: THREE.Vector3,
    point: THREE.Vector3,
    angle: number
  ) {
    const x = vector.x - point.x;
    const y = vector.y - point.y;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const newX = x * cos - y * sin;
    const newY = x * sin + y * cos;

    return new THREE.Vector3(newX + point.x, newY + point.y, vector.z);
  }
}
