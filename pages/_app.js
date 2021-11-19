import Navbar from "../components/navbar";
import React, { createContext } from "react";
import "../styles/globals.scss";
export const GlobalContext = createContext({});
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { Curtains } from "react-curtains";
import gsap from "gsap";

function App({ Component, router, pageProps }) {
  const { pathname } = useRouter();

  useEffect(() => {
    gsap.from(".content_layout", { opacity: 0 });

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
