import React, { useRef, useState } from "react";
import { Plane, useCurtains } from "react-curtains";
import { vertexShader, fragmentShader } from "../assets/shaders/FluidImage";
import { Vec2 } from "curtainsjs";

export default function FluidImage({ src, classElement }) {
  const [plane, setPlane] = useState(null);
  const mousePosition = useRef(new Vec2());
  const mouseLastPosition = useRef(new Vec2());

  const deltas = useRef({
    max: 0,
    applied: 0,
  });

  const uniforms = {
    resolution: {
      // resolution of our plane
      name: "uResolution",
      type: "2f", // notice this is an length 2 array of floats
      value: [0, 0],
    },
    time: {
      // time uniform that will be updated at each draw call
      name: "uTime",
      type: "1f",
      value: 0,
    },
    mouse: {
      // our mouse position
      name: "uMouse",
      type: "2f", // again an array of floats
      value: mousePosition.current,
    },
    isHover: {
      // our mouse position
      name: "uIsHover",
      type: "1f", // again an array of floats
      value: 0,
    },
    strength: {
      // the mouse move strength
      name: "uStrength",
      type: "1f",
      value: 0,
    },
    radius: {
      // the mouse move strength
      name: "uRadius",
      type: "1f",
      value: 6,
    },
  };
  useCurtains(
    (curtains) => {
      const onMouseMove = (e) => {
        // update mouse last pos
        mouseLastPosition.current.copy(mousePosition.current);

        const mouse = new Vec2();

        // get our mouse/touch position
        if (e.targetTouches) {
          mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        } else {
          mouse.set(e.clientX, e.clientY);
        }

        // lerp the mouse position a bit to smoothen the overall effect
        mousePosition.current.set(
          curtains.lerp(mousePosition.current.x, mouse.x, 0.3),
          curtains.lerp(mousePosition.current.y, mouse.y, 0.3)
        );

        // calculate the mouse move strength
        if (mouseLastPosition.current.x && mouseLastPosition.current.y) {
          let delta =
            Math.sqrt(
              Math.pow(
                mousePosition.current.x - mouseLastPosition.current.x,
                2
              ) +
                Math.pow(
                  mousePosition.current.y - mouseLastPosition.current.y,
                  2
                )
            ) / 30;
          delta = Math.min(4, delta);
          // update max delta only if it increased
          if (delta >= deltas.current.max) {
            deltas.current.max = delta;
          }
        }

        if (plane) {
          plane.uniforms.mouse.value = plane.mouseToPlaneCoords(
            mousePosition.current
          );
        }
      };
      const element = document.querySelector("." + classElement);
      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("touchmove", onMouseMove, { passive: true });

      return () => {
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("touchmove", onMouseMove, {
          passive: true,
        });
      };
    },
    [plane]
  );

  const setResolution = (plane) => {
    const planeBBox = plane.getBoundingRect();
    plane.uniforms.resolution.value = [planeBBox.width, planeBBox.height];
  };

  const onReady = (plane) => {
    plane.setPerspective(35);

    deltas.current.max = 2;

    setResolution(plane);

    setPlane(plane);
  };

  const onRender = (plane) => {
    const planeBBox = plane.getBoundingRect();
    plane.uniforms.resolution.value = [planeBBox.width, planeBBox.height];
    // increment our time uniform
    plane.uniforms.time.value++;

    // decrease both deltas by damping : if the user doesn't move the mouse, effect will fade away
    deltas.current.applied +=
      (deltas.current.max - deltas.current.applied) * 0.02;
    deltas.current.max += (0 - deltas.current.max) * 0.01;

    // send the new mouse move strength value
    plane.uniforms.strength.value = deltas.current.applied;
  };

  const onAfterResize = (plane) => {
    setResolution(plane);
  };
  return (
    <Plane
      className={classElement}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      widthSegments={40}
      heightSegments={40}
      uniforms={uniforms}
      // plane events
      onBe
      onReady={onReady}
      onRender={onRender}
      onAfterResize={onAfterResize}
    >
      <img src={src} data-sampler="simplePlaneTexture" alt="That's Me !" />
    </Plane>
  );
}
