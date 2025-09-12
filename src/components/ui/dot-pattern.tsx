
"use client"

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DotPattern({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative h-full w-full", className)} {...props}>
      <svg className="h-full w-full">
        <defs>
          <pattern
            id="dot-pattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx="2.5"
              cy="2.5"
              r="1"
              className="fill-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-c from-background via-background/80 to-background" />
    </div>
  );
}
