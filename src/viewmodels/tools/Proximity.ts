import * as THREE from "three";
import "@react-three/fiber";
import { ToolViewModel } from "./Tool";
import { TargetIndicatorViewModel } from "../TargetIndicator";
import { ShapeViewModel } from "../ShapeViewModel";

export class ProximityToolViewModel extends ToolViewModel {
  private readonly PROXIMITY_GROUP_ID = "proximity";

  handlePointerDown(): void {}

  handlePointerMove(
    pointer: THREE.Vector3,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): void {
    const closestPoints = this.drawing.shapes.map((shape) => {
      const insideShape = this.pointHitsShape(pointer, shape, scene, camera);
      let closestPoint = new THREE.Vector3();

      if (!insideShape) {
        closestPoint = shape.getClosestPointTo(pointer);
      } else {
        closestPoint = pointer;
      }

      return closestPoint;
    });
    this.renderProximityPoints(closestPoints);
  }

  handlePointerUp(pointer: THREE.Vector3): void {
    // const closestPoints = this.drawing.shapes.map((shape) =>
    //   shape.getClosestPointTo(pointer)
    // );
    // this.renderProximityPoints(closestPoints);
  }

  toolControl(): JSX.Element | null {
    throw new Error("Method not implemented.");
  }

  private renderProximityPoints(points: THREE.Vector3[]): void {
    this.drawing.cleanToolOverlay();
    points.forEach((point, i) => {
      this.drawing.addToolOverlayedShape(
        new TargetIndicatorViewModel(i.toString(), point.clone())
      );
    });
  }

  private pointHitsShape(
    pointer: THREE.Vector3,
    shape: ShapeViewModel,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3()
      .subVectors(pointer, camera.position)
      .normalize();
    raycaster.set(camera.position, direction);
    const shapeMesh = scene.getObjectByName(shape.id);

    if (!shapeMesh) {
      return undefined;
    }

    const intersects = raycaster.intersectObjects([shapeMesh], true);

    return intersects.length > 0;
  }
}
