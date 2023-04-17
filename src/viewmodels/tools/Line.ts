import { Size } from "@react-three/fiber";
import { Camera, Group } from "three";
import { ToolViewModel } from "./Tool";
import { Point } from "../../models/Point";
import { Line } from "../../models/Line";

export class LineToolViewModel extends ToolViewModel {
  private _isDrawing: boolean = false;
  private _points: Point[] = [];
  private _line: Line | null = null;

  handlePointerDown(
    event: any,
    camera: Camera,
    size: Size,
    group: Group
  ): void {
    const mousePosition = this.getMouseCoords(event);
    const worldPosition = this.getWorldCoords(mousePosition, camera, size);

    let line = this._line || new Line(Date.now().toString());
    line.points.push({ x: worldPosition.x, y: worldPosition.y, z: 0 });
    console.debug("P1", line.points[0]);

    this._line = line;
    this.drawing.addShape(line);
  }

  handlePointerMove(
    event: any,
    camera: Camera,
    size: Size,
    group: Group
  ): void {
    if (!this._line) return;

    const mousePosition = this.getMouseCoords(event);
    const worldPosition = this.getWorldCoords(mousePosition, camera, size);

    if (this._line.points.length === 1) {
      this._line.points.push({ x: worldPosition.x, y: worldPosition.y, z: 0 });
    } else {
      this._line.points[1] = { x: worldPosition.x, y: worldPosition.y, z: 0 };
    }

    console.debug("P2", this._line.points[1]);
  }

  handlePointerUp(event: any, camera: Camera, size: Size, group: Group): void {
    console.debug("LineToolViewModel.handlePointerUp");
    this.drawing.removeShape(this._line!);
    this._line = null;
    this._isDrawing = false;
  }

  toolControl(): JSX.Element | null {
    throw new Error("Method not implemented.");
  }
}
