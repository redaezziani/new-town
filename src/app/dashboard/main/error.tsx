'use client';

import { Button } from '@/components/ui/button';
import {  Result } from 'antd';
import Link from 'next/link';
const page = () => {
    return (
        <div className="flex w-full justify-center items-center gap-2">
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={
               <Link href="/dashboard/products">
                 <Button
                >
                    Try to create a new product .
                </Button>
                </Link>
                }
            />
        </div>

    );
};

export default page;