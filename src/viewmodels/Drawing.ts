import { makeAutoObservable } from "mobx";
import { Shape } from "../models/Shape";
import { Drawing } from "../models/Drawing";
import { ToolViewModel } from "./tools/Tool";
import { DrawingService } from "../services/Drawing";
import { ShapeViewModel } from "./ShapeViewModel";
import { ShapeViewModelFactory } from "./ViewModelFacotry";

export class DrawingViewModel {
  private _drawing: Drawing;
  private _shapes: ShapeViewModel[] = [];
  public selectedShape: ShapeViewModel | null = null;
  public currentTool: ToolViewModel | null = null;
  public toolOverlayedShapes: ShapeViewModel[] = [];

  constructor() {
    this._drawing = DrawingService.loadDrawing();
    this._shapes = this._drawing.shapes.map((shape) => {
      const shapeViewModel = ShapeViewModelFactory.createShapeViewModel(shape);
      return shapeViewModel;
    });

    makeAutoObservable(this);
  }

  get shapes() {
    return [...this._shapes];
  }

  addShape(shape: ShapeViewModel) {
    this._drawing.addShape(shape.model);

    // @FIXME: this will fail if we don't change the ID to be unique
    this._shapes.push(shape);
    this.setSelectedShape(shape);
  }

  addToolOverlayedShape(shape: ShapeViewModel) {
    this.toolOverlayedShapes.push(shape);
  }

  cleanToolOverlay() {
    this.toolOverlayedShapes.splice(0);
  }

  removeShape(shape: Shape) {
    this._drawing.removeShape(shape);
    this._shapes.splice(this._shapes.findIndex((s) => s.id === shape.id));
  }

  setCurrentTool(tool: ToolViewModel | null) {
    this.cleanToolOverlay();
    this.currentTool = tool;
  }

  setSelectedShape(shape: ShapeViewModel | null) {
    this.selectedShape?.toggleSelected();

    this.selectedShape = shape;
    shape?.toggleSelected();
  }

  save() {
    DrawingService.saveDrawing(this._drawing);
  }

  load() {
    this._drawing = DrawingService.loadDrawing();
  }
}
