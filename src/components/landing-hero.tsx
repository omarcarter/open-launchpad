'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingHero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <motion.h1 {...fadeUp} className="text-4xl font-bold tracking-tight sm:text-5xl">
        Ship your next project faster
      </motion.h1>
      <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-neutral-600">
        OpenLaunchpad helps you go from idea to deployed app using reusable templates, developer-friendly integrations, and a straightforward launch workflow.
      </motion.p>
      <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-8 flex items-center justify-center gap-3">
        <Link href="/templates" className="rounded-md bg-black px-5 py-2.5 text-white hover:opacity-90">Browse templates</Link>
        <Link href="/dashboard" className="rounded-md border px-5 py-2.5 hover:bg-neutral-50">Open dashboard</Link>
      </motion.div>
    </section>
  );
}
