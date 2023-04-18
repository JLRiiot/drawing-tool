import { makeAutoObservable } from "mobx";
import { Shape } from "../models/Shape";
import { Drawing } from "../models/Drawing";
import { ToolViewModel } from "./tools/Tool";
import { DrawingService } from "../services/Drawing";
import { ShapeViewModel } from "./ShapeViewModel";
import { ShapeViewModelFactory } from "./ViewModelFacotry";

export class DrawingViewModel {
  private _drawing: Drawing;
  private _shapesViewModels: ShapeViewModel[] = [];
  private _drawingStrocke: number = 0;
  public currentTool: ToolViewModel | null = null;

  constructor() {
    this._drawing = DrawingService.loadDrawing();
    this._shapesViewModels = this._drawing.shapes.map((shape) => {
      const shapeViewModel = ShapeViewModelFactory.createShapeViewModel(shape);
      return shapeViewModel;
    });

    makeAutoObservable(this);
  }

  get shapes() {
    return [...this._shapesViewModels];
  }

  addShape(shape: ShapeViewModel) {
    this._drawing.addShape(shape.model);

    // @FIXME: this will fail if we don't change the ID to be unique
    this._shapesViewModels.push(shape);
  }

  removeShape(shape: Shape) {
    this._drawing.removeShape(shape);
    this._shapesViewModels.splice(
      this._shapesViewModels.findIndex((s) => s.id === shape.id)
    );
  }

  setCurrentTool(tool: ToolViewModel | null) {
    this.currentTool = tool;
  }

  startDrawing() {
    this._drawingStrocke++;
  }

  endDrawing() {
    this._drawingStrocke = 0;
  }

  continueDrawing() {
    this._drawingStrocke++;
  }

  save() {
    DrawingService.saveDrawing(this._drawing);
  }

  load() {
    this._drawing = DrawingService.loadDrawing();
  }
}
