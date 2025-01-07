import { Core, ICore } from "core";
import { Scene } from "modules";

export interface IGame extends ICore {}

export class Game extends Core {
  id = this.inheritId("game");

  scene?: Scene;
  scenes: Record<string, Scene> = {};

  constructor(props: IGame) {
    super(props);
  }

  addScene(scene: Scene) {
    this.scenes[scene.id] = scene;

    if (!this.scene) {
      this.scene = scene;
    }
  }

  loadScene(scene: string | Scene) {
    let targetScene = scene;

    if (typeof scene === "string" && this.scenes[scene]) {
      targetScene = this.scenes[scene];
    }

    this.scene = targetScene as Scene;

    this.scene.init?.();

    this.scene.game = this;
  }

  update(dt: number) {
    if (this.scene) {
      this.scene.update(dt);
    }
  }
}
