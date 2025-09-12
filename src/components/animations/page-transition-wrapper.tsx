'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: 'linear', duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
