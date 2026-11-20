import { Badge } from "@/components/ui/badge";

type ActiveBadgeProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export function ActiveBadge({ active, activeLabel = 'Ativa', inactiveLabel = 'Inativa' }: ActiveBadgeProps) {
  return active ? (
    <Badge className="bg-emerald-600 text-white">{activeLabel}</Badge>
  ) : (
    <Badge variant="outline" className="text-muted-foreground">{inactiveLabel}</Badge>
  )
}
