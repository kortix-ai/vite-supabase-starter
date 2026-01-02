"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const numPoints = 12;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      const isDark = document.documentElement.classList.contains("dark");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        
        const radiusVariation = 
          Math.sin(time + i * 0.5) * 40 +
          Math.cos(time * 1.5 + i * 0.8) * 30 +
          Math.sin(time * 0.8 + i * 1.2) * 25;
        
        const radius = baseRadius + radiusVariation;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const cpAngle = ((i - 0.5) / numPoints) * Math.PI * 2;
          const cpRadiusVariation = 
            Math.sin(time + (i - 0.5) * 0.5) * 40 +
            Math.cos(time * 1.5 + (i - 0.5) * 0.8) * 30 +
            Math.sin(time * 0.8 + (i - 0.5) * 1.2) * 25;
          const cpRadius = baseRadius + cpRadiusVariation;
          const cpX = centerX + Math.cos(cpAngle) * cpRadius;
          const cpY = centerY + Math.sin(cpAngle) * cpRadius;

          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }

      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.5) * 50,
        centerY + Math.cos(time * 0.7) * 50,
        0,
        centerX,
        centerY,
        baseRadius * 1.5
      );

      if (isDark) {
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.4)");
        gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.35)");
        gradient.addColorStop(0.6, "rgba(236, 72, 153, 0.3)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0.2)");
      } else {
        gradient.addColorStop(0, "rgba(167, 139, 250, 0.5)");
        gradient.addColorStop(0.3, "rgba(96, 165, 250, 0.45)");
        gradient.addColorStop(0.6, "rgba(244, 114, 182, 0.4)");
        gradient.addColorStop(1, "rgba(103, 232, 249, 0.3)");
      }

      ctx.fillStyle = gradient;
      ctx.filter = "blur(40px)";
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new MutationObserver(() => {
      animate();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
