import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <Link shallow={true} href="/">
        <motion.h2
          onClick={() => setIsOpen(false)}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            delay: 1,
          }}
        >
          ALBAN
        </motion.h2>
      </Link>

      <div onClick={() => setIsOpen(!isOpen)} className="toggle">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            top: isOpen ? "50%" : "20%",
          }}
          transition={{
            ease: "linear",
            type: "tween",
          }}
        ></motion.span>
        <motion.span
          animate={{
            scale: isOpen ? 0 : 1,
          }}
          transition={{
            ease: "linear",
            type: "tween",
          }}
        ></motion.span>
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            top: isOpen ? "50%" : "80%",
          }}
          transition={{
            ease: "linear",
            type: "tween",
          }}
        ></motion.span>
      </div>

      <ul
        className={isOpen ? "open" : null}
        transition="easeInOut"
        onClick={() => setIsOpen(false)}
      >
        <motion.li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link shallow={true} href="/work">
            <a>Work</a>
          </Link>
        </motion.li>
        <motion.li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link shallow={true} href="/resume">
            <a>Resume</a>
          </Link>
        </motion.li>
        <motion.li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="https://github.com/albanbleicher">
            <a>Github</a>
          </Link>
        </motion.li>
        <motion.li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="https://www.linkedin.com/in/albanbleicher/">
            <a>LinkedIn</a>
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
}
