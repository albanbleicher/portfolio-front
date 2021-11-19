import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <Link shallow={true} href="/">
        <h2 onClick={() => setIsOpen(false)}>ALBAN</h2>
      </Link>

      <div onClick={() => setIsOpen(!isOpen)} className="toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul
        className={isOpen ? "open" : null}
        transition="easeInOut"
        onClick={() => setIsOpen(false)}
      >
        <li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link shallow={true} href="/work">
            <a>Work</a>
          </Link>
        </li>
        <li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <Link shallow={true} href="/resume">
            <a>Resume</a>
          </Link>
        </li>
        <li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <a target="_blank" href="https://github.com/albanbleicher">
            Github
          </a>
        </li>
        <li
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <a target="_blank" href="https://www.linkedin.com/in/albanbleicher/">
            LinkedIn
          </a>
        </li>
      </ul>
    </nav>
  );
}
