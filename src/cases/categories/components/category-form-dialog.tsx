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
import type { CategoryDTO, CategoryInput } from "../dtos/category.dto";
import { useCreateCategory, useUpdateCategory } from "../hooks/use-category";

type CategoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CategoryDTO | null;
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
          <DialogDescription>Preencha os dados da categoria do cardápio.</DialogDescription>
        </DialogHeader>
        {/* O formulário só é montado com o diálogo aberto, então o estado reinicia a cada abertura */}
        <CategoryForm category={category} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

type CategoryFormProps = {
  category?: CategoryDTO | null;
  onDone: () => void;
}

type FormErrors = Partial<Record<'name' | 'displayOrder', string>>;

function CategoryForm({ category, onDone }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '');
  const [icon, setIcon] = useState(category?.icon ?? '');
  const [displayOrder, setDisplayOrder] = useState(String(category?.displayOrder ?? 0));
  const [active, setActive] = useState(category?.active ?? true);
  const [errors, setErrors] = useState<FormErrors>({});

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isPending = createCategory.isPending || updateCategory.isPending;

  function validate(): FormErrors {
    const result: FormErrors = {};

    if (!name.trim()) {
      result.name = 'Informe o nome da categoria.';
    } else if (name.trim().length > 60) {
      result.name = 'O nome deve ter no máximo 60 caracteres.';
    }

    const order = Number(displayOrder);
    if (displayOrder === '' || !Number.isInteger(order) || order < 0) {
      result.displayOrder = 'A ordem deve ser um número inteiro maior ou igual a zero.';
    }

    return result;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data: CategoryInput = {
      name: name.trim(),
      icon: icon.trim() || null,
      displayOrder: Number(displayOrder),
      active
    };

    if (category) {
      updateCategory.mutate({ id: category.id, data }, { onSuccess: onDone });
    } else {
      createCategory.mutate(data, { onSuccess: onDone });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="category-name">Nome *</Label>
        <Input
          id="category-name"
          value={name}
          maxLength={60}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={!!errors.name}
        />
        <FieldError message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category-icon">Ícone (URL da imagem)</Label>
        <Input
          id="category-icon"
          value={icon}
          placeholder="https://..."
          onChange={(event) => setIcon(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category-order">Ordem de exibição *</Label>
        <Input
          id="category-order"
          type="number"
          min={0}
          step={1}
          value={displayOrder}
          onChange={(event) => setDisplayOrder(event.target.value)}
          aria-invalid={!!errors.displayOrder}
        />
        <FieldError message={errors.displayOrder} />
      </div>

      <div className="flex items-center gap-3">
        <Switch id="category-active" checked={active} onCheckedChange={setActive} />
        <Label htmlFor="category-active">Categoria ativa</Label>
      </div>

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
