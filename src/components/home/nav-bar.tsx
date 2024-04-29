import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react'
import MagicButton from './magicui/button';

const NavBar = () => {
    const [active, setActive] = React.useState(1);
    const listLinks = [{
        id: 1,
        name: "Hero",
        href: "#hero",
    },
    {
        id: 2,
        name: "Features",
        href: "#features",
    },
    {
        id: 3,
        name: "Pricing",
        href: "#pricing",
    },
    {
        id: 4,
        name: "Contact",
        href: "#contact",
    }]
    const handelActive = (id: number) => {
        setActive(id);
    }
    return (
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

                <ul className="flex text-sm lowercase  items-center   backdrop-blur-sm  px-6 py-2 gap-7">
                    <AnimatePresence>
                        {listLinks.map((link) => (
                            <motion.li
                                key={link.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handelActive(link.id)}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4 }}
                                className={`text-slate-50 relative h-fit w-fit flex justify-center items-center hover:text-slate-100 cursor-pointer `}
                            >
                                <Link
                                className={`${active === link.id ? "text-slate-100" : ""}`}
                                href={link.href}>
                                    {link.name}
                                </Link>
                                {active === link.id &&
                                <motion.span
                                layoutId="active"
                                className="absolute w-full h-0.5 -bottom-1 bg-slate-100/60"
                                ></motion.span>}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
                <Link href="/auth/signin">
                    <MagicButton >
                    <p>
        sign in
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
                    </MagicButton>
                </Link>
            </div>

        </nav>
    )
}

export default NavBar