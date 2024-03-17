'use client';
import { cn } from '~/app/lib/utils';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { Lock, Unlock, Wand } from 'lucide-react';
import { Button } from './button';
import { CreateEventDialog } from '../Dialogs/CreateEventDialog';

const transition = {
  duration: 1,
  ease: 'easeInOut',
};

export const EscrowAnimation = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) => {
  const pathControls = useAnimation();

  useEffect(() => {
    const animateLines = async () => {
      await pathControls.start((i) => ({
        pathLength: 1,
        transition: { duration: 1, ease: 'easeInOut', delay: i * 0.2 },
      }));
    };

    animateLines();
  }, [pathControls]);

  return (
    <div className={cn('sticky top-10', className)}>
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        {title || (
          <div className="flex w-full items-center justify-center gap-2">
            <div className="text-zinc-400">&lt; </div>
            <div className="tracking-tight">
              Paid<span className="text-[hsl(280,100%,70%)]">2</span>
              Hack
            </div>
            <div className="text-zinc-400">&#47;&gt;</div>
          </div>
        )}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-xs font-normal text-neutral-400 md:text-xl">
        {description || `Making sure builders get paid since 2024`}
      </p>
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute z-30 mx-auto flex w-fit rounded-full bg-white px-2 py-1 text-xs font-bold text-black md:px-4 md:py-2 md:text-base">
            <CreateEventDialog>
              <Button asChild={true} className="">
                <div className="flex w-fit">
                  Create Event <Wand className="ml-2 h-[24] w-[24]" />
                </div>
              </Button>
            </CreateEventDialog>
          </div>
        </div>
        <svg
          width="1440"
          height="400"
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          {[
            'M0 338C200 338 400 200 720 200C1040 200 1240 338 1440 338',
            'M0 263C200 263 400 200 720 200C1040 200 1240 263 1440 263',
            'M0 188C200 188 400 200 720 200C1040 200 1240 188 1440 188',
            'M0 113C200 113 400 200 720 200C1040 200 1240 113 1440 113',
            'M0 38C200 38 400 200 720 200C1040 200 1240 38 1440 38',
          ].map((d, i) => (
            <React.Fragment key={i}>
              <motion.path
                d={d}
                stroke={
                  ['#FFB7C5', '#FFDDB7', '#B1C5FF', '#4FABFF', '#076EFF'][i]
                }
                strokeWidth="2"
                fill="none"
                initial={{
                  pathLength: 0,
                }}
                animate={pathControls}
                custom={i}
                transition={transition}
              />
              <path
                d={d}
                stroke={
                  ['#FFB7C5', '#FFDDB7', '#B1C5FF', '#4FABFF', '#076EFF'][i]
                }
                strokeWidth="2"
                fill="none"
                filter="url(#blurMe)"
              />
            </React.Fragment>
          ))}
          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
