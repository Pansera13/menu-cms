import { Badge } from "@/components/ui/badge";
import { Leaf, Sparkles } from "lucide-react";

type ProductFlagsProps = {
  isVegetarian: boolean;
  isNew: boolean;
}

export function ProductFlags({ isVegetarian, isNew }: ProductFlagsProps) {
  if (!isVegetarian && !isNew) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {isVegetarian && (
        <Badge className="bg-emerald-100 text-emerald-800">
          <Leaf /> Vegetariano
        </Badge>
      )}
      {isNew && (
        <Badge className="bg-amber-100 text-amber-800">
          <Sparkles /> Novidade
        </Badge>
      )}
    </div>
  )
}
