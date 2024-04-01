'use client'

import { Grip } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const SideMenu = () => {
    const path = usePathname()
    return (
        <aside
            className='w-full flex mt-10 flex-col gap-3 justify-start items-start'
        >
            <div className='w-full flex flex-col gap-3 justify-start items-start'>
                <SideTitle
                title='dashboard' path='dashboard' />
            </div>                   
        </aside>
    )
}

type SideTitleProps = {
    title: string
    path: string
}

export const SideTitle = ({ title , path }: SideTitleProps) => {
    // lets make it array of string and all lower case
    const pathname = usePathname().split('/').map((item) => item.toLowerCase())
    console.log(pathname.includes(path))
    return (
  
        <Link
        className={`  flex justify-start items-center gap-2 font-semibold ${pathname.includes(path) ? 'text-primary' : ' text-slate-500'}`}
        href={path}>
                {title}
        </Link>
    )
}


export default SideMenu