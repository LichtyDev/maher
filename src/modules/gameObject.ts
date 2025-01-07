import { Core, ICore } from "core";
import { Transform } from "components";
import { App, Component, Scene } from "modules";
import { removeFromArray } from "utils";

export interface IGameObject extends Partial<ICore> {
  name: string;
}

export class GameObject extends Core {
  active: boolean = false;

  scene?: Scene;
  transform: Transform;
  components: Component[] = [];

  name: string;
  tag?: string;

  constructor(props: IGameObject) {
    super(props);

    this.id = this.inheritId(props.name);

    this.name = props.name;

    this.transform = new Transform({
      gameObject: this,
    });

    this.addComponent<Transform>(this.transform);
  }

  static instantiate(gameObject: GameObject, parent?: Transform) {
    const currentScene = App.game.scene;

    if (currentScene) {
      currentScene.instantiate(gameObject, parent);

      gameObject.scene = currentScene;
      gameObject.active = true;

      gameObject.init?.();
    }
  }

  static find(id: string) {
    const currentScene = App.game.scene;

    if (currentScene) {
      return currentScene.findGameObjectWithId(id);
    }
  }

  static findWithTag(tag: string) {
    const currentScene = App.game.scene;

    if (currentScene) {
      return currentScene.findGameObjectsWithTag(tag);
    }
  }

  init?() {}

  addComponent<T extends Component>(component: T) {
    this.components.push(component);
    component.gameObject = this;
    component.setEnabled();
  }

  addComponents(...components: Component[]) {
    components.forEach((c) => this.addComponent(c));
  }

  getComponent<T extends Component>(ctor: new (...args: any[]) => T): T | undefined {
    for (const c of this.components) {
      if (c instanceof ctor) {
        return c as T;
      }
    }

    return undefined;
  }

  getComponentInChildren<T extends Component>(ctor: new (...args: any[]) => T): T | undefined {
    let component = this.getComponent<T>(ctor);

    if (!component) {
      this.transform.children.forEach((child) => {
        if (component) return;

        component = child.gameObject.getComponentInChildren<T>(ctor);
      });
    }

    return component;
  }

  removeComponent<T extends Component>(component: T) {
    removeFromArray(this.components, component);
  }
}
