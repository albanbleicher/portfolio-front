import { useEffect, useRef } from "react";
import App from "./images/three/app";

export default function Images({ images }) {
  const canvas = useRef();
  const wrapper = useRef();
  useEffect(() => {
    const slider = new App({
      canvas,
      wrapper,
    });
  }, []);
  return (
    <div className="work-images" ref={wrapper}>
      <canvas ref={canvas}></canvas>
    </div>
  );
}
