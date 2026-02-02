import React from "react";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-slate-200/70 ${className ?? ""}`} />
  );
}
