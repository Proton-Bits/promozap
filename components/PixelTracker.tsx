"use client";

import { useEffect } from "react";
import { trackPageView, trackViewContent, PixelGroup } from "@/lib/meta-pixel";

export default function PixelTracker({ group }: Readonly<{ group?: PixelGroup }>) {
  useEffect(() => {
    trackPageView(group);
    trackViewContent(group);
  }, [group]);

  return null;
}
