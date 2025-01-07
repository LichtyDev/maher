import * as PIXI from "pixi.js";

import { App } from "modules";

import { IRenderer, Renderer } from "./renderer";

export interface IGraphicRenderer extends IRenderer {
  draw: (graphics: PIXI.Graphics) => void;
  redraw?: boolean;
}

export class GraphicRenderer extends Renderer {
  graphics: PIXI.Graphics;

  draw: () => void;
  redraw?: boolean;

  constructor(props: IGraphicRenderer) {
    super(props);

    this.graphics = new PIXI.Graphics();
    this.redraw = !!props.redraw;

    this.draw = () => {
      this.graphics.clear();

      props.draw(this.graphics);
    };
  }

  init(): void {
    this.draw();

    App.pixi.stage.addChild(this.graphics);
  }

  update(dt: number, time: number): void {
    if (this.redraw) this.draw();

    this.renderElement(this.graphics);
  }
}
