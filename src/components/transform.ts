import { Vector } from "utils/classes";
import { Component, IComponent } from "modules";

export interface ITransform extends IComponent {
  position?: Vector;
  scale?: Vector;
  rotation?: number;
}

export class Transform extends Component {
  parent?: Transform;
  children: Transform[] = [];

  localPosition;
  localScale;
  localRotation;

  constructor(props: ITransform) {
    super(props);

    const { position, scale, rotation } = props;

    this.localPosition = position || new Vector(0);
    this.localScale = scale || new Vector(1);
    this.localRotation = rotation || 0;
  }

  addChild(transform: Transform) {
    this.children.push(transform);
    transform.parent = this;
  }

  removeChild(transform: Transform) {
    this.children.splice(this.children.indexOf(transform), 1);
  }

  getPosition(): Vector {
    if (this.parent) return this.parent.getPosition().plus(this.localPosition);

    return this.localPosition;
  }

  getScale(): Vector {
    if (this.parent) return this.parent.getScale().multiplied(this.localScale);

    return this.localScale;
  }

  getRotation(): number {
    if (this.parent) return this.parent.getRotation() + this.localRotation;

    return this.localRotation;
  }
}
