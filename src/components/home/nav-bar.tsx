import Link from 'next/link'
import React from 'react'



type NavBarProps = {
    children: React.ReactNode
}

const NavBar = ({children}:NavBarProps) => {
  return (
    <>
    {children}
    </>
  )
}


type NavlinkProps = {
    href: string
    children: React.ReactNode
}

const Navlink = ({href,children}:NavlinkProps) => {
    return (
        <Link
        href={href}
        >
           {children}
        </Link>
    )
}


type NavButtonProps = {
    children: React.ReactNode
}

const NavButton = ({children}:NavBarProps) => {
    return (
        <>
        {children}
        </>
    )
}
export {NavBar,Navlink,NavButton}

