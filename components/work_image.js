import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
export default function WorkImage({ data, big }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div className="work_image">
        <Image
          layout="responsive"
          width={256}
          height={160}
          objectFit="cover"
          onClick={() => setIsZoomed(true)}
          src={data}
        />
      </motion.div>
      <AnimatePresence>
        {isZoomed && (
          <motion.div
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
              duration: 0.2,
            }}
            exit={{ opacity: 0 }}
            className="zoomed_view"
            onClick={() => setIsZoomed(false)}
          >
            <span>Click anywhere to close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="162"
              height="162"
              viewBox="0 0 162 162"
            >
              <g
                id="Ellipse_3"
                data-name="Ellipse 3"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="133 34"
              >
                <circle cx="81" cy="81" r="81" stroke="none" />
                <circle cx="81" cy="81" r="80.5" fill="none" />
              </g>
            </svg>

            <Image
              src={big}
              width={2560 / 3}
              height={1600 / 3}
              objectFit="cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
