import * as PIXI from "pixi.js";

import { Game } from "modules";
import { Core, ICore } from "core";
import { InputManager, StorageManager } from "utils";

export interface IApp extends Partial<ICore> {
  name: string;
}

export class App extends Core {
  static game: Game;
  static instance: App;
  static pixi: PIXI.Application;

  constructor(props: IApp) {
    super({
      ...props,
    });

    this.id = props.name;

    App.game = new Game({
      id: this.inheritId("game"),
    });

    StorageManager.init(this.id);
    InputManager.init();

    App.pixi = new PIXI.Application();

    App.pixi
      .init({
        background: "white",
        width: window.innerWidth,
        height: window.innerHeight,
      })
      .then(() => {
        App.create(App.pixi);

        App.loop(16);
      });

    App.instance = this;
  }

  static lastFrame = 0;
  static loop(time: number) {
    const deltaTime = (time - App.lastFrame) / 1000;
    App.lastFrame = time;

    App.game.update(deltaTime);

    InputManager.update();

    requestAnimationFrame((time) => App.loop(time));
  }

  static create(app: PIXI.Application) {
    const container = document.createElement("div");

    Object.assign(container.style, {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "repeating-linear-gradient(45deg, #e54545, #e54545 10px, #c2a5a5 10px, #c2a5a5 20px)",
    });

    window.addEventListener("resize", () => {
      app.renderer.resize(window.innerWidth - 50, window.innerHeight - 50);
    });

    container.appendChild(app.canvas);

    document.body.appendChild(container);
  }
}
