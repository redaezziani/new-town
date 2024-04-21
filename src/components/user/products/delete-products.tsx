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
                    title: "Error",
                    description: json.message,
                })
                return;
            }
            toast({
                variant: "success",
                title: "Product Deleted",
                description: "Product has been deleted",
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
                                Delete Products
                            </span>
                        </DialogTitle>
                        <DialogDescription
                        className=' text-center'
                        >
                            Are you sure you want to delete the selected products, this action cannot be undone.
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
                                Confirme & Delete
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="w-full h-14 justify-end items-center flex">
                {selected.length > 0 && (
                    <Button
                        variant={'destructive'}
                        onClick={() => setOpen(true)}
                        disabled={loading}
                        isloading={loading}
                        className=" flex gap-2  "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
                            <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13C14.9628 4 15.9443 4 16.7889 4.42229C17.6334 4.84458 18.2223 5.62972 19.4 7.2C21.1333 9.51111 22 10.6667 22 12C22 13.3333 21.1333 14.4889 19.4 16.8C18.2223 18.3703 17.6334 19.1554 16.7889 19.5777C15.9443 20 14.9628 20 13 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M14 9L8 14.9996M14 15L8 9.00039" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Delete
                    </Button>
                )}
            </div>

        </>
    )
}

export default DeleteProducts