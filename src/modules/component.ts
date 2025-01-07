import { Core, ICore } from "core";
import { GameObject } from "modules";

export interface IComponent extends ICore {
  gameObject: GameObject;
}

export abstract class Component extends Core {
  enabled: boolean = false;

  gameObject: GameObject;

  constructor(props: IComponent) {
    super(props);

    this.gameObject = props.gameObject;

    this.id = this.inheritId(this.constructor.name);
  }

  setEnabled() {
    this.enabled = true;

    this.start?.();
  }

  setDisabled() {
    this.enabled = false;

    this.end?.();
  }

  destroy() {
    this.onDestroy?.();
    this.gameObject.removeComponent(this);
  }

  /**
   * Gets called when the component is enabled for the first time
   */
  init?() {}

  /**
   * Gets called when the component is enabled
   */
  start?() {}

  /**
   * Gets called when the component is disabled
   */
  end?() {}

  /**
   * Gets called every tick
   */
  update?(dt: number, time: number) {}

  /**
   * Gets called every fixed tick independent of framerate
   */
  fixedUpdate?(dt: number, time: number) {}

  /**
   * Gets called before being removed from the gameObject
   */
  onDestroy?() {}
}
