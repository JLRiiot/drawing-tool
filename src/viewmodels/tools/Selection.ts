import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { ShapeViewModel } from "../ShapeViewModel";

export class SelectionToolViewModel extends ToolViewModel {
  handlePointerDown(): void {}
  handlePointerMove(): void {}
  handlePointerUp(
    pointer: THREE.Vector3,
    group: THREE.Scene,
    camera: THREE.Camera
  ): void {
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3()
      .subVectors(pointer, camera.position)
      .normalize();
    raycaster.set(camera.position, direction);

    const intersects = raycaster.intersectObjects(group.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const object = intersect.object;

      console.debug("Selected object", object);

      const viewModel = (object.userData.viewModel as ShapeViewModel) || null;

      this.drawing.setSelectedShape(viewModel);
    }
  }

  toolControl(): JSX.Element | null {
    throw new Error("Method not implemented.");
  }
}
