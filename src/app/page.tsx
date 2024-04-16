'use client';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SideBar } from "@/components/home/side-bar";
import { ModeToggle } from "@/components/ui/mode";

const COLORS_TOP = ["#fbbd23", "#fbbd23",]

const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);



  return (
    <motion.section

      className="relative w-full flex justify-center items-center flex-col gap-2 min-h-screen place-content-center bg-background   px-4 py-24 text-gray-800"
    >
      <div className=" flex z-50 lg:hidden fixed right-4 top-3">
        <SideBar />
      </div>
      <div className={`absolute z-[1]  inset-0 bg-cover `}>
        <div className="w-full h-full hue-rotate-60 bg-repeat bg-[url('./assets/decorationBlockLight.svg')] dark:bg-[url('./assets/decorationBlockDark.svg')]" style={{ WebkitMaskImage: 'radial-gradient(70% 70% at 50.00% 30%, #000 0%, rgba(0, 0, 0, 0.25) 100%)' }}></div>
      </div>
      <div className=" w-full fixed top-0 z-10 justify-center items-center flex mx-auto   ">
        <nav
          className="flex w-full justify-between items-center max-w-7xl mx-auto px-4 py-4 text-gray-200"
        >
          <Link
            href={"/"}
            className="flex gap-2 items-center">
            <img
              className="w-10 aspect-square h-auto object-cover"
              src="/logo/zunder.png" alt="" />
            <span
              className="font-bold text-slate-900 dark:text-slate-50 "
            >
              Zunder
            </span>
          </Link>
          <div className="lg:flex hidden  items-center gap-8">

            <ul className="flex text-sm lowercase  items-center bg-black/30 dark:bg-white/30 backdrop-blur-sm rounded-md px-6 py-2 gap-4">
              <li>
                <a href="#features" className="hover:text-gray-50">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gray-50">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-50">
                  Contact
                </a>
              </li>
            </ul>
            <Link href="/auth/signin">
              <Button
                className=" bg-slate-900 hover:bg-slate-900/90 px-8 text-slate-50 dark:text-slate-900 dark:bg-slate-50 dark:hover:bg-slate-50/90"
              >
                Sign in
              </Button>
            </Link>
            <ModeToggle />
          </div>

        </nav>
      </div>
      <AnimatePresence>
        <motion.div

          className="relative z-10 flex flex-col items-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-black transition-colors duration-200 group-hover:bg-slate-800" />
            <span className="text z-10 lowercase text-[#cbd5e1]">
              Beta Now Live! 🎉
            </span>
          </motion.button>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mt-3 bg-gradient-to-br from-[#feb600f1] to-[#dda109] bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            Zunder {/* */} .
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="my-6 max-w-xl text-slate-400 text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            zunder is a powerful, yet simple to use platform that allows you to
            manage your store and track your orders with ease.
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default AuroraHero;