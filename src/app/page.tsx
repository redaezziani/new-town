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
import { BentoDemo } from "@/components/home/grid";
import PlansCards from "@/components/for-all/plans-cards";
import ShinyButton from "@/components/for-all/button";

const AuroraHero = () => {

  return (
    <motion.section

      className="relative w-full flex bg-white dark:bg-[#000214]  justify-center items-center flex-col gap-2 min-h-screen place-content-center    px-4 py-24 text-gray-800"
    >
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="hidden h-full w-full max-w-7xl grid-cols-3 gap-3.5 px-4 lg:grid"><div className="border-x border-white/[0.035]"></div><div className="border-x border-white/[0.035]"></div><div className="border-x border-white/[0.035]"></div></div></div>

      <div className=" flex z-50 lg:hidden fixed right-4 top-3">
        <SideBar />
      </div>
      <div className="absolute z-0 inset-0 blur-[400px] h-28 w-[90%] top-0 bg-white/55 "></div>

      <div className=" w-full   fixed top-0 z-40 justify-center flex-col items-center flex mx-auto   ">
        <div className="w-full text-sm hidden lg:flex border border-t-transparent border-b border-border  p-1.5 justify-center items-center gap-3 bg-[#151830ae]  font-semibold">
          <span className=" text-slate-100 p-1">
            Join our beta program today
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#ffffff"} fill={"none"}>
    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
        </div>
        <nav
          className="flex w-full  justify-between bg-background/15 backdrop-blur-md items-center max-w-7xl mx-auto px-4 py-4 text-gray-200"
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

            <ul className="flex text-sm lowercase  items-center   backdrop-blur-sm  px-6 py-2 gap-4">
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
              <button
                className=" hover:scale-105 group bg-[#d4d5f813] text-slate-50 border border-slate-300/20 px-4 py-2 rounded-full backdrop-blur-sm flex justify-center items-center gap-1"
              >
                <p>
                  sign in
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                  <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
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
            className="max-w-3xl mt-3 bg-gradient-to-br from-slate-50 to-slate-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            Zunder is the future of e-commerce
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="my-4 max-w-xl text-slate-400 text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            zunder is a powerful, yet simple to use platform that allows you to
            manage your store and track your orders with ease.
          </motion.p>

        </motion.div>
      </AnimatePresence>
      <BentoDemo />
      <div className="w-full mt-20 flex justify-center items-center flex-col gap-2">
        <p
          className=" text-lg max-w-[33rem] text-center text-[#b4bcd0b9]"
        >
          Make your store managment easy with Zunder fast and reliable platform and more features.
          <span
            className=" scale-105 flex gap-1 justify-center items-center text-[#ffffff]"
          >
            Get started today! by choice one of our plans below.
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </span>
        </p>
        <div className="flex justify-center items-center gap-3">
          <svg
            className=" text-white size-40 "
            viewBox="0 0 180 54" fill="currentColor" role="img" focusable="false"><path d="M89.515 20.5c-4.424 0-7.614 2.925-7.614 7.313 0 4.387 3.59 7.312 8.014 7.312 2.673 0 5.03-1.072 6.488-2.88l-3.066-1.796c-.81.898-2.04 1.422-3.422 1.422-1.919 0-3.55-1.016-4.155-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.19-7.308-7.613-7.308zm-3.791 5.89c.5-1.62 1.871-2.64 3.787-2.64 1.919 0 3.29 1.02 3.786 2.64h-7.573zm46.938-5.89c-4.424 0-7.613 2.925-7.613 7.313 0 4.387 3.59 7.312 8.014 7.312 2.672 0 5.028-1.072 6.487-2.88l-3.065-1.796c-.81.898-2.04 1.422-3.422 1.422-1.92 0-3.551-1.016-4.156-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.189-7.308-7.613-7.308zm-3.787 5.89c.501-1.62 1.872-2.64 3.787-2.64 1.919 0 3.29 1.02 3.787 2.64h-7.574zm-15.639 1.422c0 2.438 1.571 4.063 4.007 4.063 1.651 0 2.889-.76 3.526-1.999l3.078 1.8c-1.275 2.153-3.663 3.449-6.604 3.449-4.428 0-7.613-2.925-7.613-7.313 0-4.387 3.189-7.312 7.613-7.312 2.941 0 5.325 1.296 6.604 3.45l-3.078 1.799c-.637-1.24-1.875-1.999-3.526-1.999-2.432 0-4.007 1.625-4.007 4.063zm33.05-11.78v18.687h-3.607V16.03h3.607zM47.806 14l14.806 26H33l14.806-26zm37.016 2.031l-11.103 19.5-11.103-19.5h4.163l6.94 12.188 6.94-12.188h4.163zm23.606 4.875v3.937a4.517 4.517 0 00-1.283-.2c-2.328 0-4.007 1.626-4.007 4.063v6.013h-3.606V20.906h3.606v3.738c0-2.064 2.369-3.738 5.29-3.738z" fill="#fff"></path></svg>
          <svg
            className=" text-white size-40 "
            viewBox="0 0 180 56" fill="currentColor" role="img" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M81.969 27.838c.318-1.491 1.345-2.25 2.696-2.25 1.338 0 2.317.793 2.63 2.25h-5.326zm2.769-4.832c-3.438 0-5.577 2.654-5.577 5.901 0 3.363 2.285 5.857 5.682 5.857 2.342 0 3.763-1.047 4.642-2.365L87.3 31.05c-.55.726-1.43 1.11-2.372 1.11-1.543 0-2.576-.698-2.928-2.094h5.772l-.002.006 2.104.012c.08-.368.127-.747.127-1.176 0-2.828-1.803-5.901-5.262-5.901zM71.484 32.111c-1.899 0-3.04-1.361-3.04-3.04 0-1.68 1.163-3.041 3.04-3.041 1.876 0 3.04 1.361 3.04 3.04 0 1.68-1.142 3.041-3.04 3.041zm3.04-7.186c-.814-.96-1.969-1.548-3.402-1.548-3.205 0-5.51 2.55-5.51 5.694s2.284 5.693 5.51 5.693c1.433 0 2.588-.588 3.401-1.548v1.268h2.832V19.388h-2.832v5.537zM98.478 28.65c.791.54 1.293 1.353 1.293 2.424 0 2.166-1.49 3.668-4.278 3.668-2.623 0-4.03-1.316-4.59-2.645l2.408-1.376s.324 1.436 2.139 1.436c1.123 0 1.469-.486 1.469-.915 0-.2-.065-.565-.864-.875-1.606-.621-4.71-.9-4.71-3.734 0-2.32 1.857-3.557 4.148-3.557 2.142 0 3.518 1.305 4.04 2.32l-2.355 1.348s-.453-1.127-1.663-1.127-1.318.685-1.318.884c0 .58.604.818 1.901 1.193.768.222 1.557.424 2.382.953l-.002.002zM146 26.124h-2.442v4.596c0 1.436 1.426 1.127 2.442 1.127v2.585s-.535.088-1.469.088c-2.074 0-3.76-.619-3.76-3.8v-4.596h-1.88v-2.74h1.88v-3.093h2.787v3.093H146v2.74zm-39.3 5.833c1.157 0 2.046-.564 2.496-1.49l2.416 1.417c-.947 1.698-2.711 2.879-4.912 2.879-3.338 0-5.671-2.611-5.671-5.833 0-3.221 2.355-5.833 5.671-5.833 2.169 0 3.926 1.162 4.883 2.837l-2.411 1.45c-.458-.914-1.34-1.48-2.472-1.48-1.686 0-2.884 1.354-2.884 3.026 0 1.672 1.187 3.027 2.884 3.027zM132.21 32.447c-1.83 0-2.931-1.397-2.931-3.121s1.122-3.12 2.931-3.12 2.931 1.396 2.931 3.12c0 1.724-1.1 3.121-2.931 3.121zm.349-8.965c3.09 0 5.312 2.617 5.312 5.844 0 3.227-2.201 5.843-5.312 5.843-1.382 0-2.495-.603-3.28-1.588v5.705h-2.73V23.792h2.73v1.279c.785-.985 1.898-1.588 3.28-1.588zm-11.258 11.4V23.815h2.73v11.067h-2.73zm-5.087-9.177c.527-1.341 1.6-2.108 3.216-2.112v3.188c-1.895-.188-3.264.798-3.214 3.126l-.002-.005v4.98h-2.73V23.815h2.73v1.89zm5.087-3.367v-2.95h2.82v2.95h-2.82zM34 39.567c0 1.476.942 2.433 2.394 2.433h6.994c4.172 0 7.586-1.435 9.906-3.947H34v1.514zM43.388 15h-6.994C34.942 15 34 15.957 34 17.433v1.514h19.294C50.974 16.435 47.56 15 43.388 15zm6.104 17.347c0 1.194.765 1.969 1.945 1.969h4.19c.476-1.199.795-2.516.943-3.937h-5.133c-1.18 0-1.945.774-1.945 1.968zm-5.81-7.684c0 1.194.766 1.968 1.946 1.968H56.57a14.828 14.828 0 00-.942-3.937h-10c-1.18 0-1.945.775-1.945 1.969zm1.944 7.684c0-1.194-.765-1.968-1.945-1.968H34v3.937h9.681c1.18 0 1.945-.775 1.945-1.969zm-5.809-7.684c0-1.194-.765-1.969-1.945-1.969H34v3.937h3.872c1.18 0 1.945-.774 1.945-1.968z" fill="#fff"></path></svg>
          <svg
            className=" text-white size-40 "
            viewBox="0 0 180 54" fill="currentColor" role="img" focusable="false"><path d="M77.53 23.818a.528.528 0 01-.697-.137 4.043 4.043 0 00-3.437-1.729c-2.619 0-4.226 2.069-4.226 5.022 0 2.954 1.636 5.062 4.255 5.062a4.007 4.007 0 003.444-1.807.52.52 0 01.687-.154l1.244.72a.528.528 0 01.193.777 6.468 6.468 0 01-5.564 2.872c-4.187 0-7.025-3.032-7.025-7.453s2.838-7.414 6.962-7.414a6.606 6.606 0 015.539 2.738.532.532 0 01-.144.765l-1.23.738zM86.683 33.642v-.6c-.655.842-1.568 1.365-3.038 1.365-2.174 0-3.683-1.186-3.683-3.267 0-2.591 2.315-3.036 3.742-3.235 1.532-.222 2.838-.327 2.838-1.327 0-.885-1.025-1.124-1.892-1.124a6.44 6.44 0 00-2.858.722.52.52 0 01-.713-.225l-.449-.935a.526.526 0 01.216-.692 8.608 8.608 0 014.02-1.007c2.494 0 4.255 1.023 4.255 3.497v6.828a.522.522 0 01-.523.523h-1.369a.524.524 0 01-.546-.523zm-.141-4.721c-.481.363-1.368.484-2.314.653-.947.17-1.732.422-1.732 1.448 0 .944.684 1.385 1.673 1.385 1.227 0 2.373-.683 2.373-2.27V28.92zM91.37 31.46a.524.524 0 01.724-.068 4.875 4.875 0 003.044.98c1.13 0 1.964-.362 1.964-1.244 0-.804-.766-.964-2.619-1.288-1.964-.327-3.843-.98-3.843-3.215 0-2.33 2.014-3.313 4.308-3.313a6.454 6.454 0 013.99 1.307.52.52 0 01.072.755l-.654.767a.527.527 0 01-.72.082 4.623 4.623 0 00-2.783-.889c-.965 0-1.81.281-1.81 1.043 0 .846 1.185 1.006 2.373 1.209 2.537.44 4.148 1.163 4.148 3.267 0 2.209-1.771 3.575-4.583 3.575a6.612 6.612 0 01-4.256-1.386.53.53 0 01-.068-.751l.713-.83zM101.119 33.644V20.345a.523.523 0 01.524-.523h1.509a.523.523 0 01.524.523v4.542a3.936 3.936 0 013.241-1.568c2.232 0 3.541 1.587 3.541 3.855v6.47a.523.523 0 01-.523.522h-1.509a.524.524 0 01-.524-.522v-5.882c0-1.127-.364-2.15-1.811-2.15-1.371 0-2.415.964-2.415 2.572v5.463a.524.524 0 01-.524.523h-1.509a.52.52 0 01-.524-.526zM127.064 33.815l-1.086-3.202h-5.494l-1.089 3.202a.525.525 0 01-.495.353h-1.771a.527.527 0 01-.519-.456.52.52 0 01.029-.247l4.945-13.301a.53.53 0 01.492-.327h2.419a.53.53 0 01.494.343l4.927 13.298a.517.517 0 01-.252.644.525.525 0 01-.243.059h-1.869a.525.525 0 01-.488-.366zm-3.804-11.661l-2.115 6.227h4.148l-2.033-6.227zM133.709 24.082v.824a3.857 3.857 0 013.274-1.588c2.897 0 4.769 2.392 4.769 5.525 0 3.134-1.872 5.555-4.769 5.555a3.844 3.844 0 01-3.274-1.608v4.336a.523.523 0 01-.523.523h-1.509a.523.523 0 01-.524-.523v-13.07a.523.523 0 01.524-.523h1.509a.52.52 0 01.491.341.509.509 0 01.032.209zm2.737 8.097c1.771 0 2.619-1.51 2.619-3.336 0-1.826-.864-3.297-2.619-3.297-1.754 0-2.737 1.467-2.737 3.297s.934 3.336 2.737 3.336zM145.887 24.082v.824a3.849 3.849 0 013.274-1.588c2.9 0 4.772 2.391 4.772 5.525 0 3.134-1.872 5.555-4.772 5.555a3.85 3.85 0 01-3.274-1.608v4.336a.522.522 0 01-.523.523h-1.509a.523.523 0 01-.524-.523v-13.07a.523.523 0 01.524-.523h1.509a.52.52 0 01.523.55zm2.74 8.097c1.771 0 2.619-1.51 2.619-3.336 0-1.826-.865-3.297-2.619-3.297-1.754 0-2.74 1.467-2.74 3.297s.946 3.336 2.74 3.336z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M33.466 13C29.895 13 27 15.89 27 19.454v15.092C27 38.111 29.895 41 33.466 41h14.97c3.57 0 6.465-2.89 6.465-6.454V19.454c0-3.565-2.894-6.454-6.465-6.454h-14.97zm12.018 10.414a5.918 5.918 0 00-3.81-1.396c-1.15 0-2.299.38-2.299 1.435 0 .963 1.024 1.34 2.284 1.803l.373.138c2.493.84 4.546 1.869 4.546 4.308 0 2.649-2.06 4.458-5.43 4.665l-.305 1.42a.575.575 0 01-.565.452H38.16a.586.586 0 01-.558-.702l.328-1.498a7.791 7.791 0 01-3.4-1.859.567.567 0 010-.816l1.176-1.147a.572.572 0 01.802 0 5.675 5.675 0 004.003 1.564c1.534 0 2.575-.65 2.575-1.679 0-.93-.853-1.242-2.473-1.834-.172-.063-.353-.128-.542-.199-2.082-.74-4.053-1.8-4.053-4.261 0-2.85 2.385-4.24 5.196-4.377l.296-1.446a.575.575 0 01.562-.449h2.111a.572.572 0 01.562.685l-.328 1.616a8.705 8.705 0 012.932 1.64.56.56 0 01.03.823l-1.097 1.098a.582.582 0 01-.798.016z" fill="#fff"></path></svg>
          <svg
            className=" text-white size-40 "
            viewBox="0 0 180 56" fill="currentColor" role="img" focusable="false"><path d="M45.249 23.464c-2.499 0-3.725 2.207-3.725 5.154v7.385H38V20.419h3.462v4.043h.06c.74-2.486 2.213-4.495 4.485-4.495 1.599 0 2.273.56 2.273.56l-1.59 3.21s-.507-.273-1.441-.273zm42.596 2.14V36h-3.432V26.87c0-2.622-.82-4.01-2.916-4.01-2.17 0-3.22 1.756-3.22 5.124V36h-3.402v-9.131c0-2.52-.81-4.01-2.885-4.01-2.368 0-3.28 2.08-3.28 5.124V36h-3.462V20.419h3.462v3.529h.031c.54-2.443 2.011-3.95 4.495-3.95 2.463 0 4.068 1.327 4.677 3.679.58-2.264 2.123-3.68 4.495-3.68 3.31 0 5.438 2.08 5.438 5.606zm-32.64-5.637c-3.185 0-5.27 1.5-6.22 4.206l2.932 1.069c.535-1.633 1.65-2.563 3.35-2.563 1.914 0 3.038.845 3.038 2.14 0 1.326-.895 1.603-2.916 1.93-2.248.363-7.595.482-7.595 5.003 0 2.648 2.21 4.641 5.529 4.641 2.495 0 4.194-1.022 4.98-2.924h.031V36h3.433v-9.584c-.002-4.193-2.107-6.45-6.562-6.45zm3.19 8.7c0 3.267-1.614 5.366-4.192 5.366-1.823 0-2.916-1.026-2.916-2.504 0-1.386 1.124-2.349 3.28-2.745 2.206-.406 3.317-.908 3.827-2.11v1.992zm41.661-8.67c-2.626 0-4.36 1.447-5.103 3.62v-3.198h-3.646V42h3.615v-9.196h.03c.805 2.354 2.48 3.649 5.104 3.649 4.16 0 7.138-3.436 7.138-8.29-.002-4.82-2.978-8.165-7.138-8.165zm-.897 13.563c-2.882 0-4.48-2.095-4.48-5.35 0-3.255 1.788-5.35 4.48-5.35 2.69 0 4.48 2.197 4.48 5.35 0 3.155-1.788 5.35-4.48 5.35zM143 35.93v.098l-14.108.005v-.102c2.035-1.152 3.439-2.325 4.702-3.55h5.793L143 35.93zm-3.496-18.414L135.928 14h-.103s.06 6.552-5.944 12.51c-5.875 5.832-12.784 5.846-12.784 5.846v.102l3.643 3.577s6.808.067 12.822-5.846c5.993-5.892 5.942-12.673 5.942-12.673z" fill="#fff"></path></svg>
          <svg
            className=" text-white size-40 "
            viewBox="0 0 180 56" fill="currentColor" role="img" focusable="false"><path d="M34 18.2a2.2 2.2 0 012.2-2.2h8.6a2.2 2.2 0 012.2 2.2v1.7a1.1 1.1 0 01-1.1 1.1H35.1a1.1 1.1 0 01-1.1-1.1v-1.7zM34 25.1a1.1 1.1 0 011.1-1.1h20.7a2.2 2.2 0 012.2 2.2v5.7a1.1 1.1 0 01-1.1 1.1H36.2a2.2 2.2 0 01-2.2-2.2v-5.7zM45 37.1a1.1 1.1 0 011.1-1.1h10.8a1.1 1.1 0 011.1 1.1v.7a2.2 2.2 0 01-2.2 2.2h-8.6a2.2 2.2 0 01-2.2-2.2v-.7zM71.596 30.741h2.311l4.293 7.017h5.256l-4.76-7.512c2.641-.909 4.182-2.945 4.182-5.89 0-4.127-2.89-6.356-7.54-6.356H67v19.758h4.596v-7.017zm0-3.742V21.88h3.494c2.174 0 3.275.936 3.275 2.56 0 1.595-1.1 2.558-3.275 2.558h-3.494zM91.363 38.06c2.89 0 5.531-1.458 6.605-4.237L94.28 32.64c-.413 1.266-1.486 1.926-2.862 1.926-1.678 0-2.862-1.128-3.164-3.11h9.824v-1.155c0-4.1-2.395-7.348-6.797-7.348-4.183 0-7.265 3.247-7.265 7.54 0 4.513 2.972 7.568 7.347 7.568zm-.138-11.694c1.624 0 2.477 1.1 2.505 2.394H88.39c.44-1.596 1.486-2.394 2.834-2.394zM100.573 33.878c0 2.972 1.569 4.018 4.706 4.018 1.046 0 1.871-.083 2.642-.193v-3.605c-.496.055-.743.083-1.266.083-1.101 0-1.734-.22-1.734-1.431v-5.862h2.834v-3.632h-2.834v-4.018h-4.348v4.018h-1.844v3.632h1.844v6.99zM123.672 30.52c0-4.512-3-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.265 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962s2.89 1.431 2.89 3.963-1.129 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM139.527 30.52c0-4.512-2.999-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.266 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962 1.762 0 2.89 1.431 2.89 3.963s-1.128 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM146 18h-4.403v19.758H146V18z" fill="#fff"></path></svg>
          <img 
            className=" text-white size-20 "
            src="/Stripe.svg" 
            alt="Aurora logo"
          />
        </div>
      </div>
      <div className="w-full max-w-7xl px-10 min-h-[30px] flex justify-start items-center relative">
        <img
        className="w-full h-full rounded-lg object-cover"
        src="https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/8ab5dc31-5b91-4a8e-477c-afeb53cdd700/f=auto,q=95,fit=scale-down,metadata=none" alt=""  />
      </div>
      <PlansCards />
    </motion.section>
  );
};

export default AuroraHero;