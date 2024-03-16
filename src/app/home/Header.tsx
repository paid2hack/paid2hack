'use client';
import { useScroll, useTransform, useAnimation } from 'framer-motion';
import React, { Suspense, useEffect } from 'react';
import { EscrowAnimation } from '../Components/UI/EscrowAnimation';

export function Header() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  return (
    <div
      className="relative h-[80vh] w-full overflow-clip rounded-md bg-black  dark:border dark:border-white/[0.1]"
      ref={ref}
    >
      <EscrowAnimation />
    </div>
  );
}
