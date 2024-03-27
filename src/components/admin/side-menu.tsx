'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {  Bot, BotMessageSquare,  Clover, FlaskConical, Folder} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const SideMenu = () => {
    const path = usePathname()
    return (
        <aside
            className='w-full flex mt-10 flex-col gap-3 justify-start items-start'
        >
            <Accordion
            className='w-full gap-0'
            type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger
                    className=' '
                    >
                        <div className="w-full flex justify-start gap-3 items-center ">
                        <FlaskConical className='w-5 h-5 mr-2' />
                        <p
                        className={` text-primary font-semibold ${path.includes('dashboard') ? 'text-primary' : 'text-slate-400'}`}
                        >
                            Product Management
                        </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent
                    className='w-full justify-start px-5 items-center  flex'
                    >
                        <span
                        className=' transform py-5 bg-slate-300/60 px-[0.040rem]'
                        />
                        <div className="flex justify-start items-center">
                        <span
                        className=' transform  px-3 bg-slate-300/60 py-[0.040rem]'
                        />
                         <Link
                         href={'/dashboard/product-management/'}
                         className="flex gap-2 justify-start items-center">
                           <Folder className='w-4 text-slate-400 h-4 ' />
                            <p
                            className='text-slate-400'
                            >
                                Create Product
                            </p>
                         </Link>
                        </div>
                    </AccordionContent>

                </AccordionItem>
            </Accordion>
            <Accordion
            className='w-full gap-0'
            type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger
                    className=' '
                    >
                        <div className="w-full flex justify-start gap-3 items-center ">
                        <Bot className='w-5 h-5 mr-2' />
                        <p
                        className={` text-primary font-semibold ${path.includes('dashboard') ? 'text-primary' : 'text-slate-400'}`}
                        >
                            Bot Management
                        </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent
                    className='w-full justify-start px-5 items-center  flex'
                    >
                        <span
                        className=' transform py-5 bg-slate-300/60 px-[0.040rem]'
                        />
                        <div className="flex justify-start items-center">
                        <span
                        className=' transform  px-3 bg-slate-300/60 py-[0.040rem]'
                        />
                         <Link
                         href={'/dashboard/bot-management/'}
                         className="flex gap-2 justify-start items-center">
                           <BotMessageSquare className='w-5 text-slate-400 h-5 ' />
                            <p
                            className='text-slate-400'
                            >
                               Create chat bot
                            </p>
                         </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}

export default SideMenu