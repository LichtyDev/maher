import { lerp } from "utils";

export class Vector {
  x: number;
  y: number;

  constructor(x: number = 0, y?: number) {
    this.x = x;
    this.y = y === 0 ? 0 : y || x;
  }

  static left() {
    return new Vector(-1, 0);
  }
  static right() {
    return new Vector(1, 0);
  }
  static up() {
    return new Vector(0, 1);
  }
  static down() {
    return new Vector(0, -1);
  }
  static zero() {
    return new Vector();
  }
  static one() {
    return new Vector(1);
  }
  static quad(value: number) {
    return new Vector(value);
  }

  /** Write **/

  set(x: number, y: number) {
    this.x = x;
    this.y = y;

    return this;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  multiply(multiplier: number) {
    this.x *= multiplier;
    this.y *= multiplier;

    return this;
  }

  normalize() {
    this.x = this.x / this.length();
    this.y = this.y / this.length();
  }

  rotate(degree: number) {
    const radians = degree * (Math.PI / 180);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const x = this.x * cos - this.y * sin;
    const y = this.x * sin + this.y * cos;

    this.x = x;
    this.y = y;

    return this;
  }

  lerp(vector: Vector, t: number) {
    return new Vector(lerp(this.x, vector.x, t), lerp(this.y, vector.y, t));
  }

  /** Read **/

  plus(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  multiplied(vector: Vector) {
    return new Vector(this.x * vector.x, this.y * vector.y);
  }

  normalized() {
    return new Vector(this.x / this.length(), this.y / this.length());
  }

  dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  rotation() {
    const radians = Math.atan2(this.y, this.x);
    const degrees = radians * (180 / Math.PI);

    return (degrees + 360) % 360;
  }

  reflect(vector: Vector) {
    const dotProduct = this.dot(vector);
    return new Vector(this.x - 2 * dotProduct * vector.x, this.y - 2 * dotProduct * vector.y);
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  to(vector: Vector) {
    return new Vector(vector.x - this.x, vector.y - this.y);
  }

  distanceTo(vector: Vector) {
    this.to(vector).length();
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return `(${Math.floor(this.x * 10) / 10} : ${Math.floor(this.y * 10) / 10})`;
  }
}
