import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
export default function Mouse() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const scale = useMotionValue(1)
    const [hovering, setHovering] = useState(false)
    const springConfig = { damping:100, stiffness: 1000 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const scaleSpring = useSpring(scale, springConfig);
    useEffect(() => {     
    const moveCursor = (e) => {
        if(e.target.tagName === 'A' || e.target.classList.contains('react-on-hover')) {
            scale.set(0.5);
            setHovering(true)
        }
        else { 
            scale.set(1)
            setHovering(false)
        }
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        
      }
      window.addEventListener('mousemove', moveCursor)
      return () => {
        window.removeEventListener('mousemove', moveCursor)
      }
    }, [])
    return (
        <motion.div className={hovering ? 'mouse hovering' : 'mouse'} style={{left: cursorXSpring,
            top: cursorYSpring,
            scale:scaleSpring,
            x:'-50%',
            y:'-50%'
          }}></motion.div>
    )
}