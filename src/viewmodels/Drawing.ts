import { makeAutoObservable } from "mobx";
import { Shape, ShapeType } from "../models/Shape";
import { Drawing } from "../models/Drawing";
import { ToolViewModel } from "./tools/Tool";
import { DrawingService } from "../services/Drawing";
import { ShapeViewModel } from "./ShapeViewModel";
import { ShapeViewModelFactory } from "./ViewModelFacotry";

export class DrawingViewModel {
  private _drawing: Drawing;
  private _shapesViewModels: ShapeViewModel[] = [];
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

  addShape(shape: Shape) {
    this._drawing.addShape(shape);
    // @FIXME: this will fail if we don't change the ID to be unique
    this._shapesViewModels.push(
      ShapeViewModelFactory.createShapeViewModel(shape)
    );
  }

  removeShape(shape: Shape) {
    this._drawing.removeShape(shape);
  }

  setCurrentTool(tool: ToolViewModel | null) {
    this.currentTool = tool;
  }

  save() {
    DrawingService.saveDrawing(this._drawing);
  }

  load() {
    this._drawing = DrawingService.loadDrawing();
  }
}
