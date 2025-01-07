import { Transform } from "components";
import { Core, ICore } from "core";
import { Game, GameObject } from "modules";

export interface IScene extends ICore {
  name: string;
}

export class Scene extends Core {
  root: GameObject;
  game?: Game;

  time: number = 0;

  gameObjectRefs: Record<string, GameObject> = {};

  constructor(props: IScene) {
    super(props);

    this.id = this.inheritId(props.name);

    this.root = new GameObject({
      name: "Root",
    });
  }

  init?() {}

  update(deltaTime: number) {
    this.time += deltaTime;

    this.updateInstance(this.root, deltaTime, this.time);
  }

  updateInstance(gameObject: GameObject, deltaTime: number, time: number) {
    gameObject.components.forEach((component) => component.enabled && component.update?.(deltaTime, time));

    gameObject.transform.children.forEach((child) => child.gameObject.active && this.updateInstance(child.gameObject, deltaTime, time));
  }

  instantiate(gameObject: GameObject, parent?: Transform) {
    if (parent) {
      parent.addChild(gameObject.transform);
    } else {
      this.root.transform.addChild(gameObject.transform);
    }

    this.gameObjectRefs[gameObject.id] = gameObject;
  }

  findGameObjectWithId(id: string) {
    if (!this.gameObjectRefs[id]) return undefined;

    return this.gameObjectRefs[id];
  }

  findGameObjectsWithTag(tag: string) {
    return Object.values(this.gameObjectRefs).filter((gameObject) => gameObject.tag === tag);
  }
}
