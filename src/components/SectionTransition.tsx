import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTransition = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    gsap.to(blob, {
      clipPath: 'circle(150% at 50% 50%)',
      scrollTrigger: {
        trigger: '#works',
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed inset-0 bg-background-reversed pointer-events-none z-0"
      style={{
        clipPath: 'circle(0% at 50% 50%)',
      }}
    />
  );
};

export default SectionTransition;
