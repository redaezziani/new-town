'use client';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";

const Slide = () => {
    const listImage = ['/client/slide-1.png', '/client/slide-2.png', '/client/slide-3.png']
    const [currentImage, setCurrentImage] = useState(0)
    const nextImage = () => {
      if (currentImage === listImage.length - 1) {
        setCurrentImage(0)
      } else {
        setCurrentImage(currentImage + 1)
      }
    }
    const prevImage = () => {
      if (currentImage === 0) {
        setCurrentImage(listImage.length - 1)
      } else {
        setCurrentImage(currentImage - 1)
      }
    }
  return (
    <section className="w-full overflow-hidden relative lg:max-w-7xl flex justify-start items-start">
    <div className="flex gap-1 absolute bottom-0 right-0">
      <Button
      variant={'default'}
      className=" rounded-none bg-primary/80 duration-500 ease-in-out hover:bg-primary"
      onClick={prevImage}
      >
        <ChevronLeft  size={24} />
      </Button>
      <Button
      variant={'default'}
      className=" rounded-none bg-primary/80 duration-500 ease-in-out hover:bg-primary"
      onClick={nextImage}
      >
        <ChevronRight  size={24} />
      </Button>
    </div>
    <div className="flex gap-1 absolute bottom-16 left-0">
      <Button
      className=" rounded-none hover:bg-white bg-white text-primary"
      >
        Shope Now            
      </Button>
      
    </div>
    <AnimatePresence>
    <motion.img
    layout="position"
    initial={{  opacity: 0 }} 
    animate={{  opacity: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full object-cover"
    src={listImage[currentImage]} alt="store" />
    </AnimatePresence>
  </section>
  )
}

export default Slide