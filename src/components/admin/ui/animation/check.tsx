import { useEffect, useRef } from 'react';

export default function CheckAnimation() {
  const animationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then((lottie) => {
        if (animationContainer.current) {
          lottie.default.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '/logo/check.json'
          });
        }
      });
    }
  }, []);

  return (
    <div className='w-28 ' ref={animationContainer}></div>
  );
}
