'use client';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ProductSlide = () => {
    return (
        <div className="w-full grid grid-cols-2 gap-4 px-8 relative ">
            <div className="w-full grid-cols-2 gap-2 flex flex-col justify-start items-start">
                <div className="w-full flex justify-between items-center">
                    <p
                        className="text-accent-foreground font-semibold"
                    >
                        For Men
                    </p>
                    <div className="flex gap-2 items-center ">
                        <Button
                            className="rounded-full p-0 aspect-square"
                        >
                            <ChevronLeft size={12} />
                        </Button>
                        <Button
                            className="rounded-full p-0 aspect-square"
                        >
                            <ChevronRight size={12} />
                        </Button>
                    </div>
                </div>
                <AnimatePresence>
                    <div className="w-full bg-red-200 max-h-80 relative justify-start items-center  gap-2 overflow-y-hidden overflow-x-scroll p-5">
                        <motion.div
                        drag="x"
                        className="w-full grid grid-cols-2 overflow-scroll  gap-2">
                            <motion.div className="w-full aspect-square h-auto bg-slate-300"></motion.div>
                            <motion.div className="w-full aspect-square h-auto bg-slate-300"></motion.div>
                            <motion.div className="w-full aspect-square h-auto bg-slate-300"></motion.div>
                            <motion.div className="w-full aspect-square h-auto bg-slate-300"></motion.div>
                        </motion.div>
                        
                        
                    </div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProductSlide