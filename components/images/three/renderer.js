import { WebGLRenderer } from "three";

export default class Renderer {
  constructor(params) {
    this.canvas = params.canvas;
    this.wrapper = params.wrapper;
    this.camera = params.camera;
    this.scene = params.scene;
    this.init();
  }
  init() {
    const { width, height } = this.wrapper.current.getBoundingClientRect();
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas.current,
      alpha: true,
    });
    this.renderer.setSize(width, height);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
