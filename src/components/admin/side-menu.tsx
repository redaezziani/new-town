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
                    icon={<svg
                        className=' text-slate-900 dark:text-slate-50'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                        <path d="M10 18L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44633 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>}
                />
                <SideItem
                    title='products'
                    path='/dashboard/products'
                    icon={
                        <svg
                        className=' text-slate-900 dark:text-slate-50'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                            <path d="M12 11.5C12.4955 11.5 12.9562 11.3015 13.8775 10.9045L14.5423 10.618C16.1808 9.91202 17 9.55902 17 9C17 8.44098 16.1808 8.08798 14.5423 7.38197L13.8775 7.09549C12.9562 6.6985 12.4955 6.5 12 6.5C11.5045 6.5 11.0438 6.6985 10.1225 7.09549L9.45768 7.38197C7.81923 8.08798 7 8.44098 7 9C7 9.55902 7.81923 9.91202 9.45768 10.618L10.1225 10.9045C11.0438 11.3015 11.5045 11.5 12 11.5ZM12 11.5V17.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M17 9V15C17 15.559 16.1808 15.912 14.5423 16.618L13.8775 16.9045C12.9562 17.3015 12.4955 17.5 12 17.5C11.5045 17.5 11.0438 17.3015 10.1225 16.9045L9.45768 16.618C7.81923 15.912 7 15.559 7 15V9" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M9.14426 2.5C6.48724 2.56075 4.93529 2.81456 3.87493 3.87493C2.81456 4.93529 2.56075 6.48724 2.5 9.14426M14.8557 2.5C17.5128 2.56075 19.0647 2.81456 20.1251 3.87493C21.1854 4.93529 21.4392 6.48724 21.5 9.14426M14.8557 21.5C17.5128 21.4392 19.0647 21.1854 20.1251 20.1251C21.1854 19.0647 21.4392 17.5128 21.5 14.8557M9.14426 21.5C6.48724 21.4392 4.93529 21.1854 3.87493 20.1251C2.81456 19.0647 2.56075 17.5128 2.5 14.8557" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                    
                />
                <SideItem
                    title='orders'
                    path='/dashboard/orders'
                    icon={
                        <svg
                        className=' text-slate-900 dark:text-slate-50'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                            <path d="M12 22C11.1818 22 10.4002 21.6698 8.83693 21.0095C4.94564 19.3657 3 18.5438 3 17.1613C3 16.7742 3 10.0645 3 7M12 22C12.8182 22 13.5998 21.6698 15.1631 21.0095C19.0544 19.3657 21 18.5438 21 17.1613V7M12 22L12 11.3548" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 12L8 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 4L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                />
                <SideItem
                    title='delivery'
                    path='/dashboard/delivery'
                    icon={
                        <svg
                        className=' text-slate-900 dark:text-slate-50'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                            <path d="M12 2C7.58172 2 4 5.13401 4 9H20C20 5.13401 16.4183 2 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 17.3333C8 15.4029 8.34533 15 10 15H14C15.6547 15 16 15.4029 16 17.3333V19.6667C16 21.5971 15.6547 22 14 22H10C8.34533 22 8 21.5971 8 19.6667V17.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.008 17.5H11.999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 9L12 15L20 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                />
                <SideItem
                    title='payments'
                    path='/dashboard/payments'
                    icon={
                        <svg
                        className=' text-slate-900 dark:text-slate-50'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                            <path d="M12.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C21.8394 6.51358 21.9755 7.93642 21.9963 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.5 20L18.5 13M15 16.5H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2 9H22" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    }
                />
                <SideItem
                    title='settings'
                    path='/dashboard/settings'
                    icon={
                        <svg
                        className=' text-slate-900 dark:text-slate-50'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"  fill="none">
                            <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    }
                />
            </div>
            <div className="flex  px-5  w-full  text-slate-300 gap-5 items-start justify-between">
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

export const SideTitle = ({ title, path }: SideTitleProps) => {
    // lets make it array of string and all lower case
    const pathname = usePathname().split('/').map((item) => item.toLowerCase())
    console.log(pathname.includes(path))
    return (

        <Link
            className={` px-5  flex justify-start items-center gap-2 font-semibold`}
            href={path}>
            {title}
        </Link>
    )
}

interface SideItemProps {
    title: string
    path: string
    icon: React.ReactNode
}
export const SideItem = ({ title, path, icon }: SideItemProps) => {
    const pathname = usePathname()
    return (
        <Link
            className={` w-full py-2 px-8 flex justify-start items-center gap-2   ${pathname == path ? ' text-slate-900 font-semibold dark:text-slate-50 bg-slate-900/5 dark:bg-slate-50/5 rounded ' : 'text-muted-foreground'}`}
            href={path}>
            {icon}
            {title}
        </Link>
    )
}


export default SideMenu