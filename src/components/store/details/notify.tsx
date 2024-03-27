'use client';
import { Button } from '@/components/ui/button'
import {toast} from 'sonner'
const Notify = () => {
    const notify = () => toast.message('',{
        dismissible: true,
        position: 'top-right',
    })
    

  return (
    <Button
        onClick={notify}
        className="rounded-full"
        >
          Shop Now
    </Button>
  )
}

export default Notify