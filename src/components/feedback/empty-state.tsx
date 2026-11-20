import { Inbox } from "lucide-react";

type EmptyStateProps = {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-12 text-muted-foreground">
      <Inbox className="size-8" />
      <p>{message}</p>
    </div>
  )
}
