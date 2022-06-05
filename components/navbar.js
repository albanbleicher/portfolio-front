import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <Link shallow={true} href="/">
        <h2 onClick={() => setIsOpen(false)}>Alban</h2>
      </Link>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "toggle open" : "toggle"}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={isOpen ? "open" : null} onClick={() => setIsOpen(false)}>
        <li>
          <Link shallow={true} href="/work">
            <a>Work</a>
          </Link>
        </li>
        <li>
          <Link shallow={true} href="/resume">
            <a>Resume</a>
          </Link>
        </li>
        <li>
          <Link shallow={true} href="/experiments">
            <a>Experiments</a>
          </Link>
        </li>
        <li>
          <Link shallow={true} href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
