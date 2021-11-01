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
        onMouseEnter={(e) => window.innerWidth > 900 && setIsHover(true)}
        onMouseLeave={(e) => window.innerWidth > 900 && setIsHover(false)}
        className="work-card"
        data-img={medias[0].url}
      >
        <motion.h2
          animate={{
            height: isHover ? 0 : 200,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="project-title"
        >
          <span className="name">{title}</span>
          <span className="type">({type})</span>
        </motion.h2>
        <motion.img
          initial={{
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            filter: isHover ? "grayscale(0%)" : "grayscale(100%)",
            opacity: isHover ? 1 : 0.2,
            scale: isHover ? 1 : 0.8,
            rotate: isHover ? -2 : 0,
          }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          className="thumb"
          src={medias[0].formats.medium.url}
        />
      </motion.div>
    </Link>
  );
}
