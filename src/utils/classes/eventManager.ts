import { removeFromArray } from "utils";

export type EventCallback = (data: Record<string, any>) => void;

export class EventManager {
  static events: Record<string, EventCallback[]> = {};

  static dispatch<T>(eventName: string, data: Record<string, any>) {
    EventManager.events[eventName]?.forEach((eventCallback) => eventCallback({ ...data }));
  }

  static on(eventName: string, callback: EventCallback) {
    this.events[eventName].push(callback);
  }

  static off(eventName: string, callback: EventCallback) {
    removeFromArray(this.events[eventName], callback);
  }
}
