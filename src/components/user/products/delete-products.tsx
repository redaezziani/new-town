'use client';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
interface DeleteProductsProps {
    selected: string[]
}
const DeleteProducts = ({ selected }: DeleteProductsProps) => {
    const { toast } = useToast()

    const [loading, setLoading] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handelDelete = async () => {
        try {
            if (!confirm) {
                return;
            }
            setLoading(true);
            const response = await fetch('/api/products', {
                method: 'DELETE',
                body: JSON.stringify({ data: selected }),
            });
            const json = await response.json();
            if (json.status === 'error') {
                toast({
                    variant: "error",
                    title: "خطأ",
                    description: json.message,
                })
                return;
            }
            toast({
                variant: "success",
                title: "تم حذف المنتج",
                description: "تم حذف المنتج بنجاح",
            })
            setOpen(false);
            setConfirm(false);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Dialog
                open={open}
                onOpenChange={() => setOpen(false)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle
                            className=' flex justify-center items-center gap-2 w-full text-lg font-semibold text-slate-800'
                        >
                            <svg
                                className=' text-red-600'
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M11.9998 16H12.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 13L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span
                                className=' text-red-600'
                            >
                                حذف المنتجات
                            </span>
                        </DialogTitle>
                        <DialogDescription
                            className=' text-center'
                        >
                            هل أنت متأكد أنك تريد حذف المنتجات المحددة؟ لا يمكن التراجع عن هذا الإجراء.
                        </DialogDescription>
                        <DialogFooter
                            className="sm:justify-start flex gap-2 items-center">
                            <Button

                                isloading={loading}
                                variant={'destructive'}
                                onClick={() => {
                                    setConfirm(true)
                                    handelDelete()
                                }
                                }
                                className=" flex gap-2 w-full mt-4 "
                            >
                                تأكيد وحذف
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="w-full h-14 justify-end items-center flex">
                {selected.length > 0 && (
                    <Button
                        variant={'destructive'}
                        onClick={() =>{
                            setOpen(true)
                            setConfirm(true)
                        }}
                        disabled={loading}
                        isloading={loading}
                        className=" flex gap-2 bg-red-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        حذف
                    </Button>
                )}
            </div>

        </>
    )
}

export default DeleteProducts