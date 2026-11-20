import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FieldError } from "@/components/form/field-error";
import type { SpotDTO, SpotInput } from "../dtos/spot.dto";
import { useCreateSpot, useUpdateSpot } from "../hooks/use-spot";

type SpotFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spot?: SpotDTO | null;
}

export function SpotFormDialog({ open, onOpenChange, spot }: SpotFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{spot ? 'Editar mesa' : 'Nova mesa'}</DialogTitle>
          <DialogDescription>Mesas são os locais onde os clientes fazem pedidos.</DialogDescription>
        </DialogHeader>
        <SpotForm spot={spot} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

type SpotFormProps = {
  spot?: SpotDTO | null;
  onDone: () => void;
}

function SpotForm({ spot, onDone }: SpotFormProps) {
  const [name, setName] = useState(spot?.name ?? '');
  const [active, setActive] = useState(spot?.active ?? true);
  const [error, setError] = useState<string>();

  const createSpot = useCreateSpot();
  const updateSpot = useUpdateSpot();
  const isPending = createSpot.isPending || updateSpot.isPending;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      setError('Informe o nome da mesa.');
      return;
    }
    setError(undefined);

    const data: SpotInput = { name: name.trim(), active };

    if (spot) {
      updateSpot.mutate({ id: spot.id, data }, { onSuccess: onDone });
    } else {
      createSpot.mutate(data, { onSuccess: onDone });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="spot-name">Nome *</Label>
        <Input
          id="spot-name"
          value={name}
          maxLength={60}
          placeholder="Ex.: Mesa 05"
          onChange={(event) => setName(event.target.value)}
          aria-invalid={!!error}
        />
        <FieldError message={error} />
      </div>

      {spot && (
        <div className="flex items-center gap-3">
          <Switch id="spot-active" checked={active} onCheckedChange={setActive} />
          <Label htmlFor="spot-active">Mesa ativa</Label>
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </form>
  )
}
