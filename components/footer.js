import Link from "next/link";
import { useEffect, useState } from "react";
export default function Footer(props) {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    setDelay(props.loading);
  }, []);
  return (
    <div
      style={{
        "--delay": delay ? "2s" : "0s",
      }}
      className="footer"
    >
      <p>2022</p>
      <Link href="/legal">
        <a>Legal</a>
      </Link>
    </div>
  );
}
