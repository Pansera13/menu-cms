import { Badge } from "@/components/ui/badge";

type ActiveBadgeProps = {
  active: boolean;
}

export function ActiveBadge({ active }: ActiveBadgeProps) {
  return active ? (
    <Badge className="bg-emerald-600 text-white">Ativa</Badge>
  ) : (
    <Badge variant="outline" className="text-muted-foreground">Inativa</Badge>
  )
}
