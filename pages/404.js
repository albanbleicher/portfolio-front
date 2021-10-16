import { Fragment } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import Link from "next/link";
import { fetchAPI } from "../lib/api";
export default function Error(props) {
  return (
    <Fragment>
      <SEO {...props} />
      <div className="error">
        <h1>Ooopsi, sorry</h1>
        <p>
          The page you're looking for doesn't exist, or was removed/replaced.
        </p>
        <Link href="/" passHref={true}>
          → Home
        </Link>
      </div>
      <Footer />
    </Fragment>
  );
}
export async function getStaticProps() {
  const global = await fetchAPI("/settings");
  return {
    props: { global, title: "Page Not Found" },
  };
}
