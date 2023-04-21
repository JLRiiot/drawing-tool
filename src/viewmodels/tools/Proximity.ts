import * as THREE from "three";
import "@react-three/fiber";
import { ToolViewModel } from "./Tool";
import { TargetIndicatorViewModel } from "../TargetIndicator";

export class ProximityToolViewModel extends ToolViewModel {
  private readonly PROXIMITY_GROUP_ID = "proximity";

  handlePointerDown(): void {}

  handlePointerMove(pointer: THREE.Vector3): void {
    const closestPoints = this.drawing.shapes.map((shape) =>
      shape.getClosestPointTo(pointer)
    );
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
}
