import Navbar from "../components/navbar";
import SEO from "../components/seo";
import React, { createContext } from "react";
import "../styles/globals.scss";
import { motion } from "framer-motion";
export const GlobalContext = createContext({});
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
function App({ Component, router, pageProps }) {
  const { pathname } = useRouter();
  useEffect(() => {
    document.querySelector("#__next").scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "." && e.shiftKey) {
        window.open("https://github.com/albanbleicher", "_blank").focus();
      }
    });
  }, [pathname]);

  // console.log(router.events)
  return (
    <GlobalContext.Provider value={pageProps}>
      <React.StrictMode>
        <Navbar />
        <motion.div
          key={router.route}
          initial="initial"
          animate="final"
          variants={{
            initial: {
              opacity: 0,
            },
            final: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 1.5,
          }}
          className="content_layout"
        >
          <Component {...pageProps} />
        </motion.div>
      </React.StrictMode>
    </GlobalContext.Provider>
  );
}
export default App;
