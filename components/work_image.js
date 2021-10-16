import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
export default function WorkImage({ data, big }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [blur, setBlur] = useState();
  const getBlur = async () => {};
  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div className="work_image">
        <motion.img onClick={() => setIsZoomed(true)} src={data}></motion.img>
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
            <Image
              src={big}
              width={160 * 6}
              height={90 * 6}
              objectFit="cover"
              placeholder="blur"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
