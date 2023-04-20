import * as THREE from "three";
import { Shape, ShapeType } from "../models/Shape";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class ShapeViewModel {
  public selected: boolean = false;
  public color: number = 0xd8d8d8;

  constructor() {
    makeObservable(this, {
      type: computed,
      id: computed,
      model: computed,
      color: observable,
      selected: observable,
      setColor: action.bound,
      toShape: observable,
      toggleSelected: action.bound,
      actionPoints: computed,
    });
  }

  abstract get type(): ShapeType;
  abstract get id(): string;
  abstract get model(): Shape;
  abstract get actionPoints(): THREE.Vector3[];
  // @FIXME: abstraction leak, we will have to modify to support Circles for example :/
  abstract toShape(): THREE.Shape | THREE.Line;

  toggleSelected(): void {
    this.selected = !this.selected;
  }

  setColor(color: number): void {
    this.color = color;
  }
}
