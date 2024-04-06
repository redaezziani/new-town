import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

interface HoverMenuProps {
    links: string[]
    children: React.ReactNode
}
 const HoverMenu = ({ links, children }: HoverMenuProps) => {
    return (
      <HoverCard>
        <HoverCardTrigger>
            {children}
        </HoverCardTrigger>
        <HoverCardContent
        className=" bg-slate-950/60 backdrop-blur-md relative mt-3 border-slate-300/30"
        >
            <ul className="flex flex-col text-slate-200/45 gap-2">
                {links.map((link, index) => (
                <li key={index}>
                    <a href={link} className="">
                    {link}
                    </a>
                </li>
                ))}
            </ul>
        </HoverCardContent>
      </HoverCard>
    )
  }

export default HoverMenu