'use client';
import InfoCardUpdate from "@/components/user/card-info-settings/info-card-update";
import { useState, useEffect } from "react"

const SettingPage = async () => {
  const [user, setUser] = useState<any>(null)
  const handelUser = async () => {
    try {
      const res = await fetch('/api/user', { next: { revalidate: 10 }, })
      const data = await res.json()
      setUser(data)
    } catch (error) {
    }
  }

  useEffect(() => {
    handelUser()
  }, [])

  return (
    <main
      className='w-full grid-cols-1 z-10 h-screen overflow-hidden grid lg:grid-cols-3 gap-3'
    >
       <div className="w-full col-span-1 border-l p-2 border-dashed border-slate-300/60 flex justify-start items-start flex-col gap-4">
      
      <div className="flex flex-col  justify-start items-start">
        <h1
          className=" text-primary font-semibold text-2xl "
        >
          معلومات المستخدم
        </h1>
        <p
          className=" text-sm text-slate-400 dark:text-slate-50"
        >
          هذه هي صفحة معلومات المستخدم حيث يمكنك تحديث معلوماتك
        </p>
      </div>
      <div className="flex flex-col  justify-start items-start">
      <img
      className=" size-14 rounded-full"
      src={user && user.data.image}
      alt=""  />
    </div>
      <div className="flex w-full justify-start items-center gap-2 ">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
          <path d="M7 7.49999L9.94202 9.23942C11.6572 10.2535 12.3428 10.2535 14.058 9.23942L17 7.49999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19.5C11.0345 19.5 10.0691 19.4878 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52437C2.08114 6.45884 2.11382 4.92607 3.24495 3.79064C4.37608 2.6552 5.95033 2.61565 9.09882 2.53655C11.0393 2.4878 12.9607 2.4878 14.9012 2.53656C18.0497 2.61567 19.6239 2.65522 20.7551 3.79065C21.8862 4.92608 21.9189 6.45885 21.9842 9.52438C21.9947 10.0172 22 10.0086 22 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.7394 15.6771L16.7394 14.2867C16.7394 14.0814 16.7479 13.8735 16.8216 13.6817C17.0175 13.1712 17.5365 12.5024 18.4815 12.5024C19.4264 12.5024 19.9659 13.1712 20.1618 13.6817C20.2354 13.8735 20.244 14.0814 20.244 14.2867L20.244 15.6771M16.8089 21.5H20.1949C21.1917 21.5 21.9998 20.6934 21.9998 19.6984V17.6971C21.9998 16.7021 21.1917 15.8955 20.1949 15.8955H16.8089C15.812 15.8955 15.0039 16.7021 15.0039 17.6971V19.6984C15.0039 20.6934 15.812 21.5 16.8089 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {user && <p
          className="text-slate-600 dark:text-slate-50"
        >
          {user.data.email}
        </p>}
      </div>
      <div className="flex w-full justify-start items-center gap-2 ">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {user && <p
          className="text-slate-600 dark:text-slate-50"
        >
          {user.data.name}
        </p>}
      </div>
    </div>
      <div className="w-full col-span-1 lg:col-span-2  h-full">
        <InfoCardUpdate user={user.data} />
      </div>
     
    </main>
  )
}

export default SettingPage
