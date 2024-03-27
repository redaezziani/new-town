'use client';

import React from 'react'
import { Button } from "@/components/ui/button";
import { MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
const Dropdown = () => {
    const [position, setPosition] = React.useState("bottom")
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <MoreVertical />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>
        Filter
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="50$"
        >
        50$
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="100$"
        >
        100$
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="150$"
        >
        150$
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Dropdown