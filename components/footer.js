import Link from "next/link";
export default function Footer() {
  return (
    <div className="footer">
      <p>2021</p>
      <Link href="/legal">
        <a>Legal</a>
      </Link>
    </div>
  );
}
