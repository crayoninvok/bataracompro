"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1563 1563"
          className="w-full h-full"
        >
          {/* Orange vertical part */}
          <motion.path
            d="M435.7 78.7c-.4.3-.7 1.5-.7 2.5 0 3.5-4.2 6.5-10.2 7.2-7.3.9-9.6 3.3-10.9 11.7-.9 5.9-1.4 6.7-5.7 10.5l-4.7 4.2-.3 534.1-.2 534.1 3.8 1.9c5.8 3 6.7 6.1 6.5 22.1-.3 16.3.1 18.8 3.2 19.6 4.6 1.1 5.7 3.6 6.7 15.6 1.3 14.9 1.4 15.1 3.9 16.3 3.8 1.7 5.9 5.6 6.6 12.4.5 5.7 1 6.7 4.8 10.5 3.6 3.5 4.4 5 5.5 10.9 1 5.5 1.9 7.6 4.6 10.2 3 3 5.5 9 6.6 16 .2 1.1 1.3 2.5 2.6 3.1 3.9 1.9 6.2 4.6 7.2 8.5.6 2 2.8 5.9 5 8.5 2.1 2.6 4.2 6.1 4.5 7.8 1.1 5.4 2.8 9 6.2 13 1.8 2.2 3.9 6 4.6 8.5.9 3.3 2.2 5.2 4.7 6.9 1.9 1.2 4.4 3.9 5.4 5.9 1.2 2.1 3.3 4.1 5.3 4.9 2.1.9 4 2.7 5.1 5 1 2.2 3.1 4.3 5.4 5.5 2.1 1 4.6 3.5 5.8 5.7 1.2 2.1 3.5 4.4 5.1 5.1s3.8 2.9 4.7 4.8c1 1.9 3.6 4.4 5.7 5.6s4.6 3.5 5.5 5.2c.9 1.6 2.6 3.5 3.7 4 3.5 1.8 5.4 3.7 7.3 7.6 1.2 2.2 2.9 3.9 4.4 4.3 1.4.3 3.7 2.5 5.3 4.9 2.7 3.9 3.2 4.2 8.7 4.8 7 .8 9.5 2.1 12.1 6.2 1.1 1.8 4.1 4.2 6.7 5.4 2.5 1.2 4.9 3.1 5.3 4.3.8 2.5 2.5 3.4 9.5 5 4.4 1 6.3 2.2 9.6 5.7l4.1 4.4 11.4.6 11.4.6 4.5 4.7 4.5 4.8 11.5.7 11.5.7 4.4 4.7 4.3 4.6h158.3"
            fill="#E85C23"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: 1,
              pathLength: 1,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          />

          {/* Teal curved shape */}
          <motion.path
            d="M790 360c-1.6-1.8-3-2.2-7.7-2.2-5.8 0-5.8 0-13.6 7-4.5 4.1-9.1 7.3-10.8 7.7-2.1.4-3.4 1.5-4.3 3.8-.9 2.2-2.8 3.8-5.9 5.3-2.5 1.2-4.8 3-5.1 4-1.1 3.4-5 6-11.5 7.7-4.5 1.1-7 2.4-8.7 4.5-1.4 1.6-4.6 3.6-7.4 4.5-2.7.9-7.2 3.4-9.9 5.6-2.8 2.2-6.9 4.6-9.3 5.2-3.4 1-4.8 2.1-6.6 5.5-2.1 3.8-3 4.3-9.2 6.2-5.2 1.5-7.4 2.8-9 5-1.5 2.1-3.7 3.5-7.7 4.6-3.3 1-6.9 2.9-9 4.9-3.6 3.4-5.7 4.4-12.8 6.4-2.6.7-4.9 2.2-6.4 4.2-1.3 1.7-5 4.4-8.4 5.9-3.3 1.6-7.3 4.3-8.7 5.9-1.5 1.6-4.6 3.5-6.9 4.1-3.2.8-4.5 1.9-6 4.9-2.2 4.2-4.9 5.6-12.7 6.6-4.5.6-5.5 1.1-7.5 4.3-1.8 2.8-3.8 4.2-7.9 5.7"
            fill="#1FBFB8"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: 1,
              pathLength: 1,
              transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" },
            }}
          />

          {/* Gray curved shape */}
          <motion.path
            d="M800 900l1.7-3.7c2.9-6.1 4.7-6.8 18.4-6.8 6.7 0 14.2-.3 16.8-.6 4.1-.6 4.9-1.1 6.6-4.3 2.3-4.7 5.5-6.1 13.4-6.1h6.4l1.6-3.9c2-5.2 4.5-6.4 12.7-6.2 8 .2 14.1-1.9 17-6 1.3-1.9 3.7-3.4 7.1-4.4 3.3-1 6.3-2.7 8.3-4.9 2.8-3.1 5.8-4.4 13.7-6.1 2-.4 3.2-1.6 4.2-3.9 1.9-4.5 4.8-6.3 11.9-7.1 5.4-.7 6-1.1 8.3-4.6 1.7-2.7 3.4-4.1 6.2-4.8 3-.9 4.1-1.9 5.7-5.3 1.5-3.2 2.8-4.5 5.5-5.3 2.5-.8 4-2.2 5.2-4.8 2.3-4.7 3.1-5.1 11.3-5.7 7-.5 7-.5 9.1-4.5 1.2-2.4 3.5-4.8 5.7-6 2.2-1.1 4.5-3.5 5.5-5.5 2.3-4.7 5.5-6.2 12.6-5.7l5.8.3 1.8-4.2c1.3-3 2.9-4.7 5.7-6 2.5-1.2 4.4-3.2 5.5-5.6 2.1-4.3 6.3-6.1 13.5-5.7 4.7.3 4.9.2 6.9-3.6 1.2-2.5 3.5-4.8 5.8-6 2.2-1.2 4.3-3.3 5-5 2-4.6 4.2-5.8 11.9-6.4 7.1-.6 7.1-.6 9.1-4.6 1.5-2.9 3.1-4.3 5.6-5.1 2.6-.9 3.8-2.1 5.1-5.2 1.5-3.4 2.4-4.2 6.7-5.6 2.9-1 5.7-2.7 6.6-4.1"
            fill="#666666"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: 1,
              pathLength: 1,
              transition: { duration: 0.8, delay: 0.8, ease: "easeInOut" },
            }}
          />
        </motion.svg>

        {/* Pulsing animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-6 text-white text-lg font-medium"
      >
        <div className="flex items-center">
          <motion.span
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            Loading
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="ml-1"
          >
            ...
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
