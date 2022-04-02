import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import Loader from "./loader";
import Renderer from "./renderer";
import World from "./world";
import { Pane } from "tweakpane";

export default class App {
  constructor(params) {
    this.canvas = params.canvas;
    this.wrapper = params.wrapper;
    this.images = [
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
      "https://placekitten.com/1920/1080",
    ];
    this.raf = null;
    this.debug = new Pane({ title: "Debug" });
    this.init();
  }
  async init() {
    /** load images, while loading, skeleton */
    const loader = new Loader();
    const textures = await loader.load(this.images);
    /** create world with all plane and images */
    this.scene = new Scene();
    this.world = new World({
      textures,
    });
    this.scene.add(this.world.container);
    /** listen to drag then move camera accordingly */
    /** renderer resize. ... . */
    const { width, height } = this.wrapper.current.getBoundingClientRect();
    this.camera = new PerspectiveCamera(45, width / height, 1, 100);
    this.debug.addInput(this.camera.position, "x", {
      min: -20,
      max: 300,
      step: 1,
    });
    const initCameraPos = new Vector3(0, 0, 3);
    this.targetPos = new Vector3();
    this.targetPos.copy(initCameraPos);

    this.renderer = new Renderer({
      wrapper: this.wrapper,
      scene: this.scene,
      camera: this.camera,
      canvas: this.canvas,
    });
    this.tick();
    this.mouse = new Vector2();
    this.mouseDownAt = new Vector2();
    this.delta = new Vector2();
    this.isDown = false;
    this.linearPos = 0;
    this.wrapper.current.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / width) * 2 - 1;
      this.mouse.y = -(e.clientY / height) * 2 + 1;
      if (this.isDown) {
        this.delta.x = this.mouseDownAt.x - this.mouse.x;
        this.delta.y = this.mouseDownAt.y - this.mouse.y;
        console.log(this.delta.x);
        this.targetPos.add(new Vector3(this.delta.x / 2, 0, 0));
      }
    });
    this.wrapper.current.addEventListener("mousedown", (e) => {
      this.isDown = true;
      this.mouseDownAt.x = (e.clientX / width) * 2 - 1;
      this.mouseDownAt.y = -(e.clientY / height) * 2 + 1;
    });
    window.addEventListener("mouseup", (e) => {
      console.log("mouseup");
      this.isDown = false;
    });
  }
  tick() {
    this.raf = requestAnimationFrame(this.tick.bind(this));
    this.camera.position.lerp(this.targetPos, 0.1);
    this.renderer.render();
  }
}
