import Navbar from "../components/navbar";
import React, { createContext, useEffect, useState } from "react";
import "../styles/globals.scss";
export const GlobalContext = createContext({});
import { useRouter } from "next/dist/client/router";
import { useLayoutEffect } from "react";
import { Curtains } from "react-curtains";
import gsap from "gsap";
import Loading from "../components/loading";

function App({ Component, router, pageProps }) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    setTimeout(() => {
      gsap.to(".loading", { opacity: 0 }).then(() => {
        setTimeout(() => {
          setLoading(false);
          gsap.from(".content_layout", { opacity: 0 });
        }, 500);
      }, 100);
    }, 2000);
  }, []);

  useEffect(() => {
    document.querySelector("#__next").scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === ".") {
        window
          .open("https://github.com/albanbleicher/portfolio-front", "_blank")
          .focus();
      }
    });
  }, [pathname]);

  if (loading) return <Loading />;
  else
    return (
      <GlobalContext.Provider value={pageProps}>
        <React.StrictMode>
          <Curtains
            production={true}
            className={router.route === "/" ? "curtains-canvas home" : null}
          >
            <Navbar />
            <div className="content_layout">
              <Component {...pageProps} />
            </div>
          </Curtains>
        </React.StrictMode>
      </GlobalContext.Provider>
    );
}
export default App;
