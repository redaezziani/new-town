import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React from 'react'

interface MagicButtonProps {
    children: React.ReactNode;
}
const MagicButton = ({children}: MagicButtonProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseEnter = ({clientX, clientY, currentTarget}: React.MouseEvent) => {
        const {left, top} = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        mouseX.set(x);
        mouseY.set(y);
    }
  return (
    <button
    onMouseMove={handleMouseEnter}
    className="  relative group  bg-[#d4d5f813] text-slate-50 border border-slate-300/10 px-4 py-2 rounded-full backdrop-blur-sm flex justify-center items-center gap-1"
>
    <motion.div
    
    style={{
        background: useMotionTemplate`radial-gradient(30px at ${mouseX}px ${mouseY}px, #dff1ff14, transparent 80%)`
    }}
    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-all ease-in-out duration-300">

    </motion.div>
    {children}
</button>
  )
}

export default MagicButton