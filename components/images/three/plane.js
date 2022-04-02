import {
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  Object3D,
  PlaneGeometry,
  Vector3,
} from "three";

export default class Plane {
  constructor(params) {
    this.image = params.image;
    this.position = params.position ? params.position : new Vector3();
    this.container = new Object3D();
    this.container.name = "Plane Container";
    this.init();
  }
  init() {
    const geo = new PlaneGeometry(3.2, 1.8);
    const mat = new MeshBasicMaterial({
      map: this.image,
    });
    const mesh = new Mesh(geo, mat);
    mesh.position.copy(this.position);
    this.container.add(mesh);
  }
}
