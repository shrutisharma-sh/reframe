"use client";

import { useEffect, useRef, RefObject } from "react";

interface Props {
  file: File | null;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function VideoPreview({ file, videoRef }: Props) {
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!file) return;

    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    if (videoRef.current) videoRef.current.src = url;

    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [file, videoRef]);

  if (!file) return null;

  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#0a0a0a] aspect-video">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        controls
        className="w-full h-full object-contain"
        playsInline
      />
    </div>
  );
}