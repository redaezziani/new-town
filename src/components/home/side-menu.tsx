'use client'

import { CreditCard, Crown, DoorClosed, Package, Settings, Target, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const SideMenu = () => {
    return (
        <aside
            className='w-full flex mt-10 flex-col gap-3 justify-between items-start h-full py-4'
        >
            <div className='w-full flex flex-col gap-5 justify-start items-start'>
                <SideTitle
                title='dashboard' path='dashboard' />
                <SideItem
                    title='home'
                    path='/dashboard'
                    icon={<DoorClosed className='w-4 h-4' />}
                />
                <SideItem
                    title='products'
                    path='/dashboard/products'
                    icon={<Target className='w-4 h-4' />}
                />
                 <SideItem
                    title='orders'
                    path='/dashboard/orders'
                    icon={<Package className='w-4 h-4' />}
                />
                <SideItem
                        title='delivery'
                        path='/dashboard/delivery'
                        icon={<UsersRound className='w-4 h-4' />}
                />
                <SideItem
                        title='payments'
                        path='/dashboard/payments'
                        icon={<CreditCard className='w-4 h-4' />}
                />
                <SideItem
                        title='settings'
                        path='/dashboard/settings'
                        icon={<Settings className='w-4 h-4' />}
                />
            </div>
            <div className="flex px-2  lg:px-5  w-full  text-slate-300 gap-5 items-start justify-between">
                <div className="flex justify-start items-center gap-2">
                <Crown className='w-5 h-5 font-semibold' />
                <span className='font-semibold text-sm'>Premium</span>
                </div>
                <span className='text-muted-foreground text-xs'>
                    Get more features with premium
                </span>
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
        className={` px-0 lg:px-5  flex justify-start items-center gap-2 font-semibold`}
        href={path}>
                {title}
        </Link>
    )
}

interface SideItemProps {
    title: string
    path: string
    icon : React.ReactNode
}
export const SideItem = ({ title, path , icon }: SideItemProps) => {
    const pathname = usePathname()
    return (
        <Link
            className={` px-3 lg:px-8 flex justify-start items-center gap-2   ${pathname == path ? 'text-primary' : 'text-muted-foreground'}`}
            href={path}>
            {icon}
            {title}
        </Link>
    )
}


export default SideMenu