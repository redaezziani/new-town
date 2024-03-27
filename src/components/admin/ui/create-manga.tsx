'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SheetClose } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import Spinner from './spiner'
import { Loader2 } from 'lucide-react'

const webSiteSchema = z.object({
  id: z.string(),
  title: z.string()
})

const CreateManga = ({ webSites }: { webSites: any }) => {
  const [selectedWebSite, setSelectedWebSite] = React.useState('')
  const [mangaTitle, setMangaTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleMangaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMangaTitle(e.target.value)
    console.log(mangaTitle)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      const res =await  fetch(`http://localhost:3000/api/manga/asq/details?manga=${mangaTitle}&id=${selectedWebSite}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)

    } catch (error) {
      console.log(error)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex gap-2 flex-col justify-start items-start">
        <SheetHeader>
          <SheetTitle>
            Scrape Manga
          </SheetTitle>
          <SheetDescription>
            Please fill in the form to scrape manga
          </SheetDescription>
        </SheetHeader>
      </div>
      <div className="flex gap-3 flex-col w-full mt-4 justify-start items-start">
        <Label>
          Manga Title
        </Label>
        <Input
          value={mangaTitle}
          onChange={handleMangaTitleChange}
          className="w-full"
          placeholder="Enter manga title"
        />
      </div>
      <Select
        onValueChange={(e) => setSelectedWebSite(e)}
      >
        <SelectTrigger>
          <SelectValue
            
            placeholder="Select a website"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {webSites.map((site: { id: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }, index: React.Key | null | undefined) => {
              return (
                <SelectItem
                  value={site.id}
                  key={index}
                >
                  {site.name}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit} className="bg-primary w-full text-primary-foreground hover:bg-primary/90 mt-4 px-4 py-2 rounded-md">
        scrape
      </Button>
      <SheetClose />
    </>
  )
}

export default CreateManga
