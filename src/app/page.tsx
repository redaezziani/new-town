'use client';
import React, { useEffect } from "react";
import {
  useMotionValue,
  motion,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SideBar } from "@/components/home/side-bar";
import { ModeToggle } from "@/components/ui/mode";
import { BentoGridSecondDemo } from "@/components/home/grid";
import { HeroScrollDemo } from "@/components/home/scroll";
import PlansCards from "@/components/for-all/plans-cards";
import ShinyButton from "@/components/for-all/button";

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

      className="relative w-full flex  justify-center items-center flex-col gap-2 min-h-screen place-content-center bg-background   px-4 py-24 text-gray-800"
    >
      <div className=" flex z-50 lg:hidden fixed right-4 top-3">
        <SideBar />
      </div>
      <div className={`absolute z-[1]  inset-0 bg-cover `}>
        <div className="w-full h-full  bg-repeat bg-[url('/assets/decorationBlockLight.svg')] bg-image-grid dark:bg-[url('/assets/decorationBlockDark.svg')]" style={{ WebkitMaskImage: 'radial-gradient(70% 70% at 50.00% 30%, #000 0%, rgba(0, 0, 0, 0.25) 100%)' }}></div>
      </div>
      <div className=" w-full   fixed top-0 z-40 justify-center flex-col items-center flex mx-auto   ">
        <div className="w-full border border-t-transparent border-b border-border flex p-1.5 justify-center items-center gap-3 bg-foreground bg-slate-50 dark:text-slate-900 font-semibold">
          <span className="text-xs p-1">
            Introducing Zunder , sign up now and get 50% off
          </span>
          <svg
            className=" text-green-500"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M11.9982 2C8.99043 2 7.04018 4.01899 4.73371 4.7549C3.79589 5.05413 3.32697 5.20374 3.1372 5.41465C2.94743 5.62556 2.89186 5.93375 2.78072 6.55013C1.59143 13.146 4.1909 19.244 10.3903 21.6175C11.0564 21.8725 11.3894 22 12.0015 22C12.6135 22 12.9466 21.8725 13.6126 21.6175C19.8116 19.2439 22.4086 13.146 21.219 6.55013C21.1078 5.93364 21.0522 5.6254 20.8624 5.41449C20.6726 5.20358 20.2037 5.05405 19.2659 4.75499C16.9585 4.01915 15.0061 2 11.9982 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 13C9 13 10 13 11 15C11 15 14.1765 10 17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <nav
          className="flex w-full justify-between bg-background/15 backdrop-blur-md items-center max-w-7xl mx-auto px-4 py-4 text-gray-200"
        >
          <Link
            href={"/"}
            className="flex gap-2 items-center">
            <svg 
              className="text-slate-900 dark:text-slate-50"
            width="40" height="40" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.32961 43.2093C0 56.0745 0 72.3843 0 105.004C0 137.623 0 153.933 5.32961 166.798C12.4341 183.948 26.0596 197.574 43.2093 204.678C56.0745 210.008 72.3843 210.008 105.004 210.008C137.623 210.008 153.933 210.008 166.798 204.678C183.948 197.574 197.574 183.948 204.678 166.798C209.454 155.269 209.95 140.974 210.002 114.653H131.113L89.679 172.547L97.6252 114.653H59.0292L114.653 37.4608L107.274 94.2197H209.999C209.935 68.6209 209.385 54.5717 204.678 43.2093C197.574 26.0596 183.948 12.4341 166.798 5.32961C153.933 0 137.623 0 105.004 0C72.3843 0 56.0745 0 43.2093 5.32961C26.0596 12.4341 12.4341 26.0596 5.32961 43.2093Z"
                fill="currentColor"
              />
            </svg>

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

          className="relative z-10 mt-40 flex flex-col items-center">
          <ShinyButton >
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className="text  gap-4  flex justify-center items-center  lowercase text-[#cbd5e1]">
              Beta Now Live!
              <span>
              🎉
              </span>
            </motion.div>
          </ShinyButton>
        


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mt-3 bg-gradient-to-br from-sky-400 to-sky-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
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
      <BentoGridSecondDemo />
      <PlansCards />
    </motion.section>
  );
};

export default AuroraHero;