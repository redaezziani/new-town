'use client';

import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast';
import React from 'react'

type SwitchActiveProps = {
    id: string
    isActive: boolean
}

const SwitchActive = ({ id, isActive }: SwitchActiveProps) => {
    const [checked, setChecked] = React.useState(isActive)
    const handelChange = (e: any) => {
        setChecked(e)
    }
    const { toast } = useToast()
    const updateActive = async () => {
        if (checked === isActive) {
            return
        }
        if (!id) {
            return
        }
        const data = {
            id: id,
            isActive: checked
        }

        const res = await fetch(`/api/products/change-active`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json()

        if (resData.status === 'error') {
            toast({
                title: 'Error',
                description: resData.message,
                variant: 'error'
            })
            setChecked(isActive)
            return
        }
        toast({
            title: 'Success',
            description: resData.message,
            variant: 'success'
        })

    }
    React.useEffect(() => {
        updateActive()
    }, [checked])
    return (
        <Switch
            checked={checked}
            onCheckedChange={handelChange}
        />
    )
}

export default SwitchActive