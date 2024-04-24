import { motion } from "framer-motion";

interface ShinyButtonProps {
    children?: React.ReactNode;
    
}

const ShinyButton = ({ children }: ShinyButtonProps) => {
  return (
    <motion.button
      //@ts-ignore
      initial={{ "--x": "100%", scale: 1 }}
      // @ts-ignore
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-6 p-1 z-10 rounded-full relative bg-white/5"
    >
      <span className="text-neutral-50 tracking-wide font-light h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-full p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;