'use client';
import { SingleImageDropzoneUsage } from "@/components/for-all/singel-image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
interface UserData {
    name?: string;
    email?: string;
    image?: string;
}
const InfoCardUpdate = ({ user }: { user: any }) => {
    const [image, setImage] = useState<string | null>(null);
    const {toast} = useToast()
    const [data, setData] = useState<UserData>({
    name: '',
    email:  '',
    });
  const [loading, setLoading] = useState(false);
  const handelUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/user/setting', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          image: image,
        }),
      })
      const json = await res.json()
      if (json.status === 'success') {
        toast({
            title: "Profile updated successfully",
            description: json.message,
            action: (
              <ToastAction altText="">
                close 
              </ToastAction>
            ),
          })
      } else {
        toast({
            title: "An error occurred",
            description: json.message,
            action: (
              <ToastAction altText="">
                close 
              </ToastAction>
            ),
          })
      }
    } catch (error) {
      alert('An error occurred while processing your request.')
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div
    className="w-full flex mt-32 flex-col md:flex-row  justify-start items-start  min-h-60 relative"
  >
    <div className="flex flex-col gap-2">
      <h3
        className="text-lg text-slate-600 font-semibold"
      >
        Personel Information
      </h3>
      <p
        className="text-sm text-slate-500"
      >
        Update your personel information here
      </p>
    </div>
    <div className="w-full lg:ml-56 lg:w-[60%] gap-4 bg-background lg:p-2 justify-start flex flex-col items-start">
      <Label

      >
        Username
      </Label>

      <Input
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="w-full"
        placeholder="Username"
        type="email"
        value={data.name}
      />
      <Label
      >
        Email
      </Label>
      <Input
        onChange={(e) => setData({ ...data, email: e.target.value })}
        className="w-full"
        placeholder="Email"
        value={data.email}
      />
     
      <Label
        className='text-muted-foreground dark:text-muted-foreground '
        htmlFor='image'
      >
        Image
      </Label>
      <SingleImageDropzoneUsage
        onFileChange={(url) => setImage(url)}
      />
      <Button
        onClick={handelUpdate}
        className="w-full"
        isloading={loading}
        disabled={loading}
      >
        Update Profile
      </Button>
    </div>
  </div>
  )
}

export default InfoCardUpdate