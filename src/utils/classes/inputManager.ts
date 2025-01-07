import { App } from "modules";
import { Vector } from "./vector";

export class InputManager {
  static keys: Set<string> = new Set();
  static keysDown: Set<string> = new Set();
  static keysUp: Set<string> = new Set();

  static mouseButtons: Set<number> = new Set();
  static mouseButtonsDown: Set<number> = new Set();
  static mouseButtonsUp: Set<number> = new Set();

  static mousePosition = new Vector();

  static init() {
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      this.keys.add(event.code);
      this.keysDown.add(event.code);
    });

    window.addEventListener("keyup", (event) => {
      event.preventDefault();

      this.keys.delete(event.code);
      this.keysUp.add(event.code);
    });

    window.addEventListener("mousedown", (event) => {
      event.preventDefault();

      this.mouseButtons.add(event.button);
      this.mouseButtonsDown.add(event.button);
    });

    window.addEventListener("mouseup", (event) => {
      event.preventDefault();

      this.mouseButtons.delete(event.button);
      this.mouseButtonsUp.add(event.button);
    });

    window.addEventListener("mousemove", (event) => {
      event.preventDefault();

      this.mousePosition.set(event.clientX - App.pixi.screen.width / 2, -event.clientY + App.pixi.screen.height / 2);
    });
  }

  static update() {
    this.keysDown.clear();
    this.keysUp.clear();
    this.mouseButtonsDown.clear();
    this.mouseButtonsUp.clear();
  }

  static getKey(keyCode: string): boolean {
    return this.keys.has(keyCode);
  }

  static getKeyDown(keyCode: string): boolean {
    return this.keysDown.has(keyCode);
  }

  static getKeyUp(keyCode: string): boolean {
    return this.keysUp.has(keyCode);
  }

  static getMouseClick(): boolean {
    return this.mouseButtonsDown.size > 0;
  }

  static getMouseButtonDown(button: number): boolean {
    return this.mouseButtonsDown.has(button);
  }

  static getMouseButtonUp(button: number): boolean {
    return this.mouseButtonsUp.has(button);
  }

  static getMousePosition(): Vector {
    return this.mousePosition.clone();
  }
}
