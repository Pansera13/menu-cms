import { Skeleton } from "@/components/ui/skeleton";

type LoadingStateProps = {
  rows?: number;
}

export function LoadingState({ rows = 4 }: LoadingStateProps) {
  return (
    <div className="flex flex-col gap-3" aria-label="Carregando">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  )
}
