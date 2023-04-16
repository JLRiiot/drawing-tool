import { action, computed, makeObservable, observable } from "mobx";
import { Shape } from "../models/Shape";
import { Drawing } from "../models/Drawing";
import { ToolViewModel } from "./tools/Tool";
import { DrawingService } from "../services/Drawing";

export class DrawingViewModel {
  private _drawing: Drawing;
  private _currentTool: ToolViewModel | null = null;

  constructor() {
    this._drawing = DrawingService.loadDrawing();

    makeObservable(this, {
      currentTool: computed,
      shapes: computed,
      addShape: action,
      removeShape: action,
      setCurrentTool: action,
      save: action,
    });
  }

  get currentTool() {
    return this._currentTool;
  }

  set currentTool(tool: ToolViewModel | null) {
    this._currentTool = tool;
  }

  get shapes() {
    return this._drawing.shapes;
  }

  addShape(shape: Shape) {
    this._drawing.addShape(shape);
  }

  removeShape(shape: Shape) {
    this._drawing.removeShape(shape);
  }

  setCurrentTool(tool: ToolViewModel | null) {
    console.debug("Setting current tool to", tool);
    this._currentTool = tool;
  }

  save() {
    DrawingService.saveDrawing(this._drawing);
  }

  load() {
    this._drawing = DrawingService.loadDrawing();
  }
}
