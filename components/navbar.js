import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
export default function Navbar() {
  useLayoutEffect(() => {
    gsap.from("nav ul, nav ul li", { opacity: 0, delay: 0.4 });
    gsap.from("nav h2", { opacity: 0, delay: 0.5 });
  }, []);
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
