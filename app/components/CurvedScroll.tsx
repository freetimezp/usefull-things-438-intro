"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Model from "./Model";

gsap.registerPlugin(ScrollTrigger);

const CurvedScroll = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".curved-scroll-box");

      boxes.forEach((box, index) => {
        const isLeft = index % 2 === 0;
        const radius = window.innerWidth * 0.2;

        ScrollTrigger.create({
          trigger: box,
          start: "top bottom",
          end: "bottom top",

          onUpdate: (self) => {
            const progress = self.progress;
            const theta = progress * Math.PI;
            const xOffset = Math.sin(theta) * radius;
            const finalX = isLeft ? -xOffset : xOffset;
            gsap.set(box, { x: finalX });
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="w-full relative">
      <div className="size-full fixed inset-0 z-10">
        <Model />
      </div>
      <div className="h-screen w-full"></div>
      <div className=" relative flex flex-col gap-[10vh] items-center">
        <div className="curved-scroll-box size-[17vw] rounded-[2vw] overflow-clip mr-[25vw] transform-gpu backface-hidden">
          <img
            src="/assets/1.png"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden ml-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/2.png"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden mr-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/3.avif"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden ml-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/4.avif"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden mr-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/5.png"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden ml-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/6.avif"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden mr-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/7.avif"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="curved-scroll-box size-[17vw] overflow-hidden ml-[25vw] rounded-[2vw] transform-gpu backface-hidden">
          <img
            src="/assets/8.avif"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
      </div>

      <div className="h-screen w-full"></div>
    </section>
  );
};

export default CurvedScroll;
