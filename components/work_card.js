import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
export default function WorkCard({ title, medias, type, slug, index }) {
  const card = useRef();
  useLayoutEffect(() => {
    gsap.from(card.current, {
      opacity: 0,
      delay: index ? index / 2 + 0.2 : 0.2,
    });
  });
  return (
    <Link href={"/work/" + slug} passHref={true}>
      <div ref={card} className="work-card">
        <h2 className="project-title">
          <span>{title}</span>
          <span>{title}</span>
        </h2>
        <span className="type">({type})</span>
      </div>
    </Link>
  );
}
