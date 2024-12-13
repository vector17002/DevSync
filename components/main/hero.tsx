"use client";

import { motion } from "framer-motion";
import React from "react";
import {AuroraBackground } from "../ui/aurora-background";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Hero() {
  return (
    <AuroraBackground id="home">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="w-full max-w-4xl text-4xl md:text-7xl font-bold dark:text-white text-center">
        Code, Collaborate, Chill All in One Place!
        </div>
        <div className="font-extralight text-sm md:text-xl dark:text-neutral-200 py-4 w-full max-w-3xl text-center">
        Host live coding sessions with audio, video, and screen sharing. Collaborate with developers worldwide, get help, or just hang out and share ideas in real-time. <br/> Build better, together.
        </div>
        <div className="flex justify-between w-full max-w-xl mt-5">
          <Link href={`/debugcohort`}>
          <Button className="bg-black dark:bg-white text-white dark:text-black font-medium text-sm md:text-lg rounded-lg px-5 py-3 hover:text-black dark:hover:text-white dark:hover:bg-black gap-2">
            Get Started
            <ArrowRightIcon className="w-4 h-4"/>
          </Button>
          </Link>
          <Link href={`#about`}>
            <Button className="px-5 py-3 text-sm md:text-lg font-medium rounded-lg bg-white dark:bg-black w-full dark:text-white hover:bg-white dark:hover:bg-black border-2 border-neutral-500">
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}