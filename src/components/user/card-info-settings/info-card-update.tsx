'use client';
import { UserDataType } from "@/app/types/help";
import { SingleImageDropzoneUsage } from "@/components/for-all/singel-image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const InfoCardUpdate = ({ user }: { user: any }) => {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [data, setData] = useState<UserDataType>({
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
  });
  const [loading, setLoading] = useState(false);

  const handelUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/setting', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.status === 'success') {
        toast({
          title: "تم تحديث الملف الشخصي بنجاح",
          description: json.message,
          action: (
            <ToastAction altText="">
              إغلاق
            </ToastAction>
          ),
        });
      }
      if (json.status === 'error') {
        toast({
          title: "حدث خطأ أثناء تحديث ملفك الشخصي",
          description: json.message,
          action: (
            <ToastAction altText="">
              إغلاق
            </ToastAction>
          ),
        });
      }

    } catch (error) {
      alert('حدث خطأ أثناء معالجة الطلب الخاص بك.')
    } finally {
      setLoading(false)
      setData({
        name: user?.name || '',
        email: user?.email || '',
        image: user?.image || '',
      });

    }
  }
  return (
    <div className="w-full flex mt-32 flex-col md:flex-row  justify-start items-start  min-h-60 relative">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg text-slate-600 font-semibold">
          معلومات شخصية
        </h3>
        <p className="text-sm text-slate-500">
          قم بتحديث معلوماتك الشخصية هنا
        </p>
      </div>
      <div className="w-full lg:ml-56 lg:w-[60%] gap-4 bg-background lg:p-2 justify-start flex flex-col items-start">
        <Label>
          اسم المستخدم
        </Label>
        <Input
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full"
          placeholder="اسم المستخدم"
          type="text"
          value={data.name}
        />
        <Label>
          البريد الإلكتروني
        </Label>
        <Input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full"
          placeholder="البريد الإلكتروني"
          type="email"
          value={data.email}
        />
        <Label className='text-muted-foreground dark:text-muted-foreground '>
          الصورة
        </Label>
        <SingleImageDropzoneUsage
          onFileChange={(url) => {
            setData({ ...data, image: url });
            setImage(url);
          }}
        />
        <Button
          onClick={handelUpdate}
          className="w-full"
          isloading={loading}
          disabled={loading}
        >
          تحديث الملف الشخصي
        </Button>
      </div>
    </div>
  )
}

export default InfoCardUpdate;
