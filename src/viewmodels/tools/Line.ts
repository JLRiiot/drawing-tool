import * as THREE from "three";
import { ToolViewModel } from "./Tool";
import { Line } from "../../models/Line";
import LineViewModel from "../Line";

export class LineToolViewModel extends ToolViewModel {
  private _line: LineViewModel | null = null;

  handlePointerDown(pointer: THREE.Vector3, group: THREE.Group): void {
    const { x, y, z } = pointer;

    const line = new Line(Date.now().toString(), [
      { x, y, z },
      { x, y, z },
    ]);

    this._line = new LineViewModel(line);

    this.drawing.startDrawing();
    this.drawing.addShape(this._line);
  }

  handlePointerMove(pointer: THREE.Vector3, group: THREE.Group): void {
    if (!this._line) return;

    const { x, y, z } = pointer;

    this._line.setEnd(new THREE.Vector3(x, y, z));
    this.drawing.continueDrawing();
  }

  handlePointerUp(pointer: THREE.Vector3, group: THREE.Group): void {
    this._line = null;
    this.drawing.endDrawing();
  }

  toolControl(): JSX.Element | null {
    throw new Error("Method not implemented.");
  }
}
