import Link from "next/link";
import { useRouter } from "next/router";

export default function ExperimentCard({ title, short_description, medias }) {
  return (
    <Link href="https://sequins.albanbleicher.fr" passHref={true}>
      <div className="experiment-card">
        <img src={medias[0].formats.small.url} />
        <h2 className="experiment-title">
          <span>{title}</span>
        </h2>
      </div>
    </Link>
  );
}
