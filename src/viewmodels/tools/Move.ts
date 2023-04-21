import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { ShapeViewModel } from "../ShapeViewModel";

export class MoveToolViewModel extends ToolViewModel {
  private selectedMesh: THREE.Mesh | null = null;
  public start: THREE.Vector3 | null = null;
  public end: THREE.Vector3 | null = null;

  handlePointerDown(
    pointer: THREE.Vector3,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): void {
    const intersects = this.raycast(pointer, camera, scene);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const object = intersect.object;

      this.selectedMesh = object as THREE.Mesh;
      const viewModel =
        (this.selectedMesh.userData.viewModel as ShapeViewModel) || null;

      this.drawing.setSelectedShape(viewModel);
      this.start = pointer;
    }
  }

  handlePointerMove(pointer: THREE.Vector3): void {
    if (this.start == null || this.selectedMesh == null) {
      return;
    }

    this.end = pointer;

    const currentPosition = this.selectedMesh.position;
    const delta = new THREE.Vector3().subVectors(this.end, this.start);
    const newPosition = new THREE.Vector3().addVectors(currentPosition, delta);
    this.drawing.selectedShape?.moveDelta(delta);
    this.selectedMesh.position.copy(newPosition);

    this.start = this.end;
  }

  handlePointerUp(
    pointer: THREE.Vector3,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): void {
    this.start = null;
    this.end = null;
    this.selectedMesh = null;
    this.drawing.setSelectedShape(null);
  }

  toolControl(): JSX.Element | null {
    throw new Error("Method not implemented.");
  }

  private raycast(
    pointer: THREE.Vector3,
    camera: THREE.Camera,
    group: THREE.Scene
  ) {
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3()
      .subVectors(pointer, camera.position)
      .normalize();
    raycaster.set(camera.position, direction);

    const intersects = raycaster.intersectObjects(group.children, true);

    return intersects;
  }
}
