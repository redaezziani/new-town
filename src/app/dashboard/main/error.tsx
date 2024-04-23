'use client';

import { Button } from '@/components/ui/button';
import {  Result } from 'antd';
const page = () => {

    return (
        <div className="flex w-full justify-center items-center gap-2">
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={
                <Button
                >
                    Try to create a new product .
                </Button>}
            />
        </div>

    );
};

export default page;