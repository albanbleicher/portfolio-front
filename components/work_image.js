import { useLayoutEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
export default function WorkImage({ src }) {
  const [wrapper, imageInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const image = useRef();
  useLayoutEffect(() => {
    if (imageInView) {
      gsap.to(image.current, {
        scale: 1,
      });
    }
  }, [imageInView]);
  return (
    <div ref={wrapper} className="work-image-container">
      <img ref={image} src={src} />
    </div>
  );
}
