import Head from "next/head";
const Seo = (props) => {
  const siteName =
    props.global && props.global.name ? props.global.name : "Alban Bleicher";
  const baseline = props.title ? props.title : props.global.baseline;
  const fullSeo = {
    // Add title suffix
    metaTitle: `${siteName} | ${baseline}`,
    metaDescription: props.short_description
      ? props.short_description
      : props.global.seo_description,
    // Get full image URL
    shareImage: props.seo_media
      ? props.seo_media.url
      : props.global.seo_screenshot.url,
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⬜</text></svg>"
      />
    </Head>
  );
};
export default Seo;
