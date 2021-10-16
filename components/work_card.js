import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function WorkCard({ title, medias, type, slug, index }) {
  const [isHover, setIsHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x, y });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <Link href={"/work/" + slug} passHref={true}>
      <motion.div
        initial="initial"
        animate="final"
        variants={{
          initial: {
            opacity: 0,
          },
          final: {
            opacity: 1,
          },
        }}
        transition={{ duration: 1, delay: 0.5 * index }}
        onMouseEnter={(e) => window.innerWidth > 900 && setIsHover(true)}
        onMouseLeave={(e) => window.innerWidth > 900 && setIsHover(false)}
        className="work-card"
        data-img={medias[0].url}
      >
        <motion.h2 className="project-title">
          <span className="name">{title}</span>
          <span className="type">({type})</span>
        </motion.h2>
        <motion.img
          animate={{
            x: 100 * mouse.x,
            y: 25 * mouse.y,
            opacity: isHover ? 1 : 0,
          }}
          className="thumb"
          src={medias[0].url}
        />
      </motion.div>
    </Link>
  );
}
