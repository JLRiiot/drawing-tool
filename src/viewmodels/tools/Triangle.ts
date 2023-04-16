import { Group } from "three";
import { ToolViewModel } from "./Tool";

export class TriangleToolViewModel extends ToolViewModel {
  handlePointerDown(event: any, group: Group): void {
    console.debug("TriangleToolViewModel.handlePointerDown", event, group);
  }
  handlePointerMove(event: any, group: Group): void {
    console.debug("TriangleToolViewModel.handlePointerMove", event, group);
  }
  handlePointerUp(event: any, group: Group): void {
    console.debug("TriangleToolViewModel.handlePointerUp", event, group);
  }
}
