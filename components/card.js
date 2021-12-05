import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Card({
  title,
  type,
  short_description,
  slug,
  origin,
  medias,
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    if (origin === "work") router.push("/work/" + slug);
    else {
      setShow(!show);
    }
  };

  return (
    <div className="card">
      <div onClick={handleClick} className="card-head">
        <h2 className="project-title">
          <span>{title}</span>
          <span>{title}</span>
        </h2>
        <span className={origin === "work" ? "type" : "icon"}>
          {origin === "work" ? `(${type})` : show ? "-" : "+"}
        </span>
      </div>
      {origin === "experiment" && (
        <div className={show ? "card-text  open" : "card-text"}>
          <div className="card-text-image">
            <img src={medias.formats.small.url} />
          </div>
          <div className="card-text-content">
            <p>
              {short_description} <br />
              <Link passHref={true} href="https://sequins.albanbleicher.fr">
                <a target="_blank">
                  <span>See {title} live ↗</span>
                </a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
