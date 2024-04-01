'use client'
import { useState } from "react"

import { Reorder } from "framer-motion"
const HomeStorePage = () => {
  const [items, setItems] = useState([
    {
      id: 0,
      className: 'w-full p-2 col-span-1 row-span-2  ',
      data: {
        title: 'Vercel is the best',
        description: 'Vercel is the best',
        image: 'https://res.cloudinary.com/dk88/image/upload/v1633121887/vercel-logo-1_p2jx0y.png',
      }
    },
    {
      id: 1,
      className: 'w-full p-2 col-span-1 row-span-2  ',
      data: {
        title: 'Vercel is the best',
        description: 'Vercel is the best',
        image: 'https://res.cloudinary.com/dk88/image/upload/v1633121887/vercel-logo-1_p2jx0y.png',
      }
    },
    {
      id: 2,
      className: 'w-full p-2 col-span-1 row-span-2  ',
      data: {
        title: 'Vercel is the best',
        description: 'Vercel is the best',
        image: 'https://res.cloudinary.com/dk88/image/upload/v1633121887/vercel-logo-1_p2jx0y.png',
      }
    }
  ])
  return (
    <main className="  w-full bg-slate-950  h-screen overflow-hidden  flex justify-start items-center flex-col relative gap-2">
      <div className="bg-primary w-full px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Love Alpine JS?
          <a href="#" className="inline-block underline">Check out this new course!</a>
        </p>
      </div>
      
    </main>
  );
}
export default HomeStorePage;
