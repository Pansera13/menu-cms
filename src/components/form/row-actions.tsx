import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
}

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Editar">
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={onDelete} aria-label="Excluir" className="text-destructive">
        <Trash2 />
      </Button>
    </div>
  )
}
