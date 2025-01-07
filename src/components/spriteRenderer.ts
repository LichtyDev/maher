import * as PIXI from "pixi.js";

import { Loader } from "utils";
import { App } from "modules";

import { IRenderer, Renderer } from "./renderer";

export interface ISpriteRenderer extends IRenderer {
  textureId: string;
}

export class SpriteRenderer extends Renderer {
  sprite?: PIXI.Sprite;

  constructor(props: ISpriteRenderer) {
    super(props);

    this.sprite = new PIXI.Sprite(Loader.textures[props.textureId]);
    this.sprite.anchor.set(0.5, 0.5);

    App.pixi.stage.addChild(this.sprite);
  }

  update(dt: number, time: number): void {
    this.sprite && this.renderElement(this.sprite);
  }
}
