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

      <svg
        onClick={() => setIsOpen(!isOpen)}
        width="19.64"
        height="14.093"
        viewBox="0 0 19.64 14.093"
      >
        <g transform="translate(-315.8 -51)">
          <line
            id="Line_16"
            data-name="Line 16"
            x1="19.64"
            transform={
              isOpen
                ? "translate(318.676 50.603) rotate(45)"
                : "translate(315.8 51)"
            }
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            id="Line_18"
            data-name="Line 18"
            x1="19.64"
            transform={
              isOpen ? "translate(345.439 57.547)" : "translate(315.8 57.547)"
            }
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            id="Line_19"
            data-name="Line 19"
            x1="19.64"
            transform={
              isOpen
                ? "translate(318.676 64.49) rotate(-45)"
                : "translate(315.8 64.093)"
            }
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
        </g>
      </svg>

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
