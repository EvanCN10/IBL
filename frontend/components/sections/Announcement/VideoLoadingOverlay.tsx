"use client";

import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface VideoLoadingOverlayProps {
  onVideoEnd: () => void;
}

export default function VideoLoadingOverlay({ onVideoEnd }: VideoLoadingOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount only on client to allow createPortal to access document.body
    setMounted(true);
  }, []);

  useEffect(() => {
    // Ensure the video plays on mount
    if (mounted && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was blocked or video play failed:", err);
      });
    }
  }, [mounted]);

  if (!mounted) return null;

  const overlay = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        zIndex: 9999,
        animation: "fadeInOverlay 1.5s ease-out forwards",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInOverlay {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `,
        }}
      />
      <video
        ref={videoRef}
        src="/video/AnnouncementVideo/Success.mp4"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        playsInline
        muted
        onEnded={onVideoEnd}
      />
    </div>
  );

  // Render directly into document.body to bypass PageScaleWrapper's CSS transform
  // stacking context which would otherwise limit fixed positioning to the wrapper bounds
  return createPortal(overlay, document.body);
}
