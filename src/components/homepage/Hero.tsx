"use client";

import React from "react";

export default function HeroWithVideo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white text-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/djgsaixee/video/upload/v1746525539/truck_xmbvmn.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di PT. Batara Dharma Persada
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100">
          Kami adalah perusahaan yang bergerak di bidang solusi teknologi untuk
          sistem ERP dan FMS armada transportasi.
        </p>
      </div>
    </section>
  );
}
