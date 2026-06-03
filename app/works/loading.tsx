import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-muted-foreground" size={28} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
