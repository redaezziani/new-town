'use client';

import { SingleImageDropzone } from '@/components/for-all/image-uploader';
import { useEdgeStore } from '@/lib/edgestore';
import { useEffect, useState } from 'react';
import { Progress } from '../ui/progress';
interface SingleImageDropzoneUsageProps {
    onFileChange: (url: string) => void;
}

export function SingleImageDropzoneUsage({ onFileChange }: SingleImageDropzoneUsageProps) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const uploadImage = async () => {
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
                setProgress(progress);
            },
          });
          onFileChange(res.url);
        }
    }

    useEffect(() => {
        uploadImage();
    }
    , [file]);

  return (
    <div
    className='w-full '
    >
      <SingleImageDropzone
      className='w-full aspect-video max-h-44 h-auto'      
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      {progress > 0 && 
      <div className="w-full flex justify-between gap-1">
        <p>
            0%
        </p>
      <Progress
      className='w-full h-1 mt-2'
      value={progress}  />
        <p>
            {progress}%
        </p>
      </div>
        }


    </div>
  );
}