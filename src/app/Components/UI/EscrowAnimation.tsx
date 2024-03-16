"use client";
import { cn } from "~/app/lib/utils";
import { motion, MotionValue } from "framer-motion";
import React from "react";
import { Lock } from "lucide-react";
const transition = {
  duration: 0,
  ease: "linear",
};

export const EscrowAnimation = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-80", className)}>
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        {title || (
          <>
            &lt; Paid<span className="text-[hsl(280,100%,70%)]">2</span>
            Hack&#47; &gt;
          </>
        )}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-xs font-normal text-neutral-400 md:text-xl">
        {description ||
          `Scroll this component and see the bottom SVG come to life wow this
        works!`}
      </p>
      <div className="bg-red-transparent absolute -top-60 flex h-[890px] w-full items-center justify-center md:-top-40">
        {" "}
        <button className="z-30 mx-auto w-fit rounded-full bg-white px-2 py-1 text-xs font-bold text-black md:px-4 md:py-2 md:text-base">
          {" "}
          ui.aceternity.com{" "}
        </button>{" "}
      </div>{" "}
      <svg
        width="1440"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-60 w-full md:-top-40"
      >
        <motion.path
          d="M0 738C200 738 400 600 720 600C1040 600 1240 738 1440 738"
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[0],
          }}
          transition={transition}
        />
        <motion.path
          d="M0 663C200 663 400 600 720 600C1040 600 1240 663 1440 663"
          stroke="#FFDDB7"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[1],
          }}
          transition={transition}
        />
        <motion.path
          d="M0 588C200 588 400 600 720 600C1040 600 1240 588 1440 588"
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[2],
          }}
          transition={transition}
        />
        <motion.path
          d="M0 513C200 513 400 600 720 600C1040 600 1240 513 1440 513"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[3],
          }}
          transition={transition}
        />
        <motion.path
          d="M0 438C200 438 400 600 720 600C1040 600 1240 438 1440 438"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[4],
          }}
          transition={transition}
        />
        <path
          d="M0 738C200 738 400 600 720 600C1040 600 1240 738 1440 738"
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          filter="url(#blurMe)"
        />
        <path
          d="M0 663C200 663 400 600 720 600C1040 600 1240 663 1440 663"
          stroke="#FFDDB7"
          strokeWidth="2"
          fill="none"
          filter="url(#blurMe)"
        />
        <path
          d="M0 588C200 588 400 600 720 600C1040 600 1240 588 1440 588"
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          filter="url(#blurMe)"
        />
        <path
          d="M0 513C200 513 400 600 720 600C1040 600 1240 513 1440 513"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          filter="url(#blurMe)"
        />
        <path
          d="M0 438C200 438 400 600 720 600C1040 600 1240 438 1440 438"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          filter="url(#blurMe)"
        />
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
