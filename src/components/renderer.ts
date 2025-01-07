import * as PIXI from "pixi.js";

import { Vector } from "utils/classes";
import { Component, IComponent } from "modules";

export interface IRenderer extends IComponent {}

export class Renderer extends Component {
  constructor(props: IRenderer) {
    super(props);
  }

  getPosition() {
    const { x: positionX, y: positionY } = this.gameObject.transform.getPosition();

    let x = window.innerWidth / 2 + positionX;
    let y = window.innerHeight / 2 - positionY;

    return new Vector(x, y);
  }

  renderElement(render: PIXI.Graphics | PIXI.Sprite) {
    const { x, y } = this.getPosition();
    const { x: scaleX, y: scaleY } = this.gameObject.transform.getScale();

    render.position.set(x, y);
    render.scale.set(scaleX, scaleY);
    render.rotation = this.gameObject.transform.getRotation();
  }
}
