import * as PIXI from "pixi.js";

export interface Maher {
  maher: boolean;
}

export const maher = (): Maher => {
  console.log("meha meha");

  const app = new PIXI.Application();

  app.init();

  return {
    maher: true,
  };
};

maher();
