import { TextureLoader } from "three";

export default class Loader {
  constructor() {
    this.textureLoader = new TextureLoader();
  }
  async load(images) {
    return new Promise((resolve, reject) => {
      const waiter = [];
      images.forEach((image) => {
        const loadPromise = this.textureLoader.loadAsync(image);
        waiter.push(loadPromise);
      });
      Promise.all(waiter)
        .then((textures) => resolve(textures))
        .catch((e) =>
          reject("An error occured while fetching screenshots.", e)
        );
    });
  }
}
