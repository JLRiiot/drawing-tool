import * as THREE from "three";
import { DrawingViewModel } from "../Drawing";

export abstract class ToolViewModel {
  constructor(protected drawing: DrawingViewModel) {}

  abstract handlePointerDown(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group,
    camera: THREE.Camera,
    pointer?: THREE.Vector2
  ): void;
  abstract handlePointerMove(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group,
    camera: THREE.Camera,
    pointer?: THREE.Vector2
  ): void;
  abstract handlePointerUp(
    event: MouseEvent | TouchEvent | any,
    group: THREE.Group,
    camera: THREE.Camera,
    pointer?: THREE.Vector2
  ): void;
  abstract toolControl(): JSX.Element | null;

  protected getMouseCoords(event: any): THREE.Vector2 {
    const x = event.clientX;
    const y = event.clientY;
    return new THREE.Vector2(x, y);
  }

  protected getWorldCoords(
    mouseCoords: THREE.Vector2,
    group: THREE.Group
  ): THREE.Vector3 {
    const raycaster = new THREE.Raycaster();

    if (!group.parent) throw new Error("Group has no parent.");

    raycaster.setFromCamera(mouseCoords, group.parent as THREE.Camera);

    const intersects = raycaster.intersectObject(group, true);

    if (intersects.length > 0) {
      return intersects[0].point;
    }

    return new THREE.Vector3();
  }
}
