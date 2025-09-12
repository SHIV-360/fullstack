
"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);
  const beams = useRef<any[]>([]);
  const beamCount = 10;
  const beamRadius = 100;
  const beamSpeed = 0.5;
  const primaryColorRef = useRef("142 71% 45%");

  useEffect(() => {
    if (canvasRef.current) {
      canvasContext.current = canvasRef.current.getContext("2d");

      // Get the computed style of the primary color
      const primaryColorValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      primaryColorRef.current = primaryColorValue;

      beams.current = Array.from({ length: beamCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * (beamSpeed - 0.1) + 0.1,
      }));

      const animate = () => {
        if (!canvasContext.current || !canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        canvasContext.current.clearRect(0, 0, window.innerWidth, window.innerHeight);

        beams.current.forEach((beam) => {
          beam.x += Math.cos(beam.angle) * beam.speed;
          beam.y += Math.sin(beam.angle) * beam.speed;

          if (beam.x < -beamRadius) beam.x = window.innerWidth + beamRadius;
          if (beam.x > window.innerWidth + beamRadius) beam.x = -beamRadius;
          if (beam.y < -beamRadius) beam.y = window.innerHeight + beamRadius;
          if (beam.y > window.innerHeight + beamRadius) beam.y = -beamRadius;
          
          const gradient = canvasContext.current!.createRadialGradient(
            beam.x,
            beam.y,
            0,
            beam.x,
            beam.y,
            beamRadius
          );
          gradient.addColorStop(0, `hsla(${primaryColorRef.current} / 0.1)`);
          gradient.addColorStop(1, `hsla(${primaryColorRef.current} / 0)`);
          
          canvasContext.current!.fillStyle = gradient;
          canvasContext.current!.beginPath();
          canvasContext.current!.arc(beam.x, beam.y, beamRadius, 0, 2 * Math.PI);
          canvasContext.current!.fill();

        });

        requestAnimationFrame(animate);
      };
      
      animate();

    }

    return () => {
        // Clean up animation frame
    }

  }, []);

  return (
    <div className={cn(
      "absolute inset-0 z-0 overflow-hidden",
      className
    )}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
