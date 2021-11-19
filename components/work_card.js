import Link from "next/link";
export default function WorkCard({ title, medias, type, slug }) {
  return (
    <Link href={"/work/" + slug} passHref={true}>
      <div className="work-card">
        <h2 className="project-title">
          <span>{title}</span>
          <span>{title}</span>
        </h2>
        <span className="type">({type})</span>
      </div>
    </Link>
  );
}
