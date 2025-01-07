import * as PIXI from "pixi.js";

export interface ImageRequest {
  id: string;
  url: string;
}

export type ImageFile = ImageRequest[];

export class Loader {
  static textures: Record<string, PIXI.Texture> = {};

  static async loadTexture(id: string, url: string, onLoadComplete?: () => void) {
    const texture = await PIXI.Assets.load(url);

    Loader.textures[id] = texture;

    onLoadComplete?.();
  }

  static async loadImages(file: ImageFile, onProgress?: (progress: number) => void, onComplete?: () => void) {
    const promises: Promise<void>[] = [];

    let imagesLoaded = 0;
    let totalImages = file.length;

    if (totalImages === 0) return;

    file.forEach((imageRequest) => {
      promises.push(
        this.loadTexture(imageRequest.id, imageRequest.url, () => {
          imagesLoaded++;
          onProgress?.(imagesLoaded / totalImages);
        })
      );
    });

    await Promise.all(promises);

    onComplete?.();
  }
}
