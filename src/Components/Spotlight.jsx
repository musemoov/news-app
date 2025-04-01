import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({ className, fill }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      className={cn(
        "pointer-events-none fixed z-[50] ",
        startAnimation && "animate-spotlight-motion", // 빛 흔들림 애니메이션
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{
        top: 0,
        left: 200,
        transformOrigin: "0% 0%", //  왼쪽 위 모서리를 기준으로 회전
        transform: startAnimation
          ? "translate(-20%, -20%) scale(1)"
          : "translate(-60%, -60%) scale(0.2)",
        opacity: startAnimation ? 1 : 0,
        transition: "transform 4s ease-out, opacity 4s ease-out",
      }}
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1999.71"
          cy="173.501"
          rx="2000"
          ry="200"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.0"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};
