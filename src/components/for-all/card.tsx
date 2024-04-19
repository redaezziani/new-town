import { motion } from "framer-motion";

interface CardProps {
    children?: React.ReactNode;
    
}

const Card = ({ children }: CardProps) => {
  return (
    <motion.div
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
      className="px-6 p-1 z-10 border  rounded-lg shadow-sm divide-y  relative dark:radial-gradient"
    >
      <div className="text-neutral-100 tracking-wide font-light h-full w-full block relative ">
        {children}
      </div>
      <span className="block absolute inset-0 rounded-lg p-px linear-overlay" />
    </motion.div>
  );
};

export default Card;