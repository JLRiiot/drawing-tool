import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { Triangle } from "../../models/Triangle";
import { Size } from "@react-three/fiber";

export class TriangleToolViewModel extends ToolViewModel {
  // private _draftTriangle: THREE.Group | null = null;
  // private _startCorner: THREE.Vector3 | null = null;
  // private _endCorner: THREE.Vector3 | null = null;
  private _center: THREE.Vector3 | null = null;
  private _draftTriangle: Triangle | null = null;
  private readonly TRIANGLE_ID = "draft-triangle";

  handlePointerDown(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size?: Size,
    _group?: THREE.Group
  ): void {
    if (!size) throw new Error("Size is undefined");

    const triangleEdgeSize = 10;
    const mousePosition = this.getMouseCoords(event);
    const worldPosition = this.getWorldCoords(mousePosition, camera, size);

    // const triangleP1 = new THREE.Vector3(pointer.x, pointer.y, 0);
    const triangleP1 = new THREE.Vector3(worldPosition.x, worldPosition.y, 0);
    const triangleP2 = new THREE.Vector3(
      worldPosition.x + triangleEdgeSize,
      worldPosition.y,
      0
    );
    const triangleP3 = new THREE.Vector3(
      worldPosition.x + triangleEdgeSize / 2,
      worldPosition.y + triangleEdgeSize,
      0
    );

    const trianglePoints = [triangleP1, triangleP2, triangleP3];

    this._draftTriangle = new Triangle(trianglePoints, Date.now().toString());
    this.drawing.addShape(this._draftTriangle);
  }

  handlePointerMove(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size?: Size,
    _group?: THREE.Group
  ): void {
    // console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }

  handlePointerUp(
    event: MouseEvent | TouchEvent | any,
    camera: THREE.Camera,
    size?: Size,
    group?: THREE.Group
  ): void {
    this._draftTriangle = null;

    if (this._draftTriangle) this.drawing.removeShape(this._draftTriangle);
  }

  toolControl(): JSX.Element | null {
    return null;
  }
}
