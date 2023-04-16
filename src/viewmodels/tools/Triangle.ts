import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { Triangle } from "../../models/Triangle";

export class TriangleToolViewModel extends ToolViewModel {
  // private _draftTriangle: THREE.Group | null = null;
  // private _startCorner: THREE.Vector3 | null = null;
  // private _endCorner: THREE.Vector3 | null = null;
  private _center: THREE.Vector3 | null = null;
  private _draftTriangle: Triangle | null = null;
  private readonly TRIANGLE_ID = "draft-triangle";

  handlePointerDown(
    event: any,
    group: THREE.Group,
    camera: THREE.Camera,
    pointer: THREE.Vector2
  ): void {
    console.debug("TriangleToolViewModel.handlePointerDown", {
      event,
      group,
      camera,
      pointer,
    });

    const triangleEdgeSize = 10;
    const trianglePoints = [
      new THREE.Vector3(pointer.x, pointer.y, 0),
      new THREE.Vector3(pointer.x + triangleEdgeSize, pointer.y, 0),
      new THREE.Vector3(
        pointer.x + triangleEdgeSize / 2,
        pointer.y + triangleEdgeSize,
        0
      ),
    ];

    this._draftTriangle = new Triangle(trianglePoints, this.TRIANGLE_ID);
    this.drawing.addShape(this._draftTriangle);
  }

  handlePointerMove(event: any, group: THREE.Group): void {
    // console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }
  handlePointerUp(event: any, group: THREE.Group): void {
    console.debug("TriangleToolViewModel.handlePointerUp", event, group);
    this._draftTriangle = null;

    if (this._draftTriangle) this.drawing.removeShape(this._draftTriangle);
  }

  toolControl(): JSX.Element | null {
    return null;
  }
}
