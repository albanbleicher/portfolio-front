import { Object3D, Vector3 } from "three";
import Plane from "./plane";
export default class World {
  constructor(params) {
    this.textures = params.textures;
    this.container = new Object3D();
    this.container.name = "World";
    this.init();
  }
  init() {
    this.textures.forEach((image, i) => {
      console.log(i, i % 8);
      const plane = new Plane({
        image,
        position: new Vector3(i > 0 ? i * 3.4 : 0, 0, 0),
      });
      this.container.add(plane.container);
    });
  }
}
