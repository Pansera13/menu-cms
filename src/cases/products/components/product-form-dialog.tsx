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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError } from "@/components/form/field-error";
import { useCategories } from "@/cases/categories/hooks/use-category";
import type { ProductDTO, ProductInput } from "../dtos/product.dto";
import { useCreateProduct, useUpdateProduct } from "../hooks/use-product";

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductDTO | null;
}

export function ProductFormDialog({ open, onOpenChange, product }: ProductFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar produto' : 'Novo produto'}</DialogTitle>
          <DialogDescription>Preencha os dados do produto do cardápio.</DialogDescription>
        </DialogHeader>
        <ProductForm product={product} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

// Valor usado no select para representar "sem categoria"
const NO_CATEGORY = 'none';

type ProductFormProps = {
  product?: ProductDTO | null;
  onDone: () => void;
}

type FormErrors = Partial<Record<'name' | 'price' | 'picture', string>>;

function ProductForm({ product, onDone }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(Number(product.price)) : '');
  const [picture, setPicture] = useState(product?.picture ?? '');
  const [categoryId, setCategoryId] = useState(product?.category?.id ?? NO_CATEGORY);
  const [active, setActive] = useState(product?.active ?? true);
  const [isVegetarian, setIsVegetarian] = useState(product?.isVegetarian ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isPending = createProduct.isPending || updateProduct.isPending;

  // a API só aceita vincular produtos a categorias ativas
  const categoryItems = [
    { value: NO_CATEGORY, label: 'Sem categoria' },
    ...categories
      .filter((category) => category.active || category.id === categoryId)
      .map((category) => ({ value: category.id, label: category.name }))
  ];

  function validate(): FormErrors {
    const result: FormErrors = {};

    if (!name.trim()) {
      result.name = 'Informe o nome do produto.';
    } else if (name.trim().length > 60) {
      result.name = 'O nome deve ter no máximo 60 caracteres.';
    }

    const priceValue = Number(price);
    if (price === '' || Number.isNaN(priceValue) || priceValue <= 0) {
      result.price = 'O preço deve ser maior que zero.';
    }

    if (picture.trim() && !/^https?:\/\/.+/.test(picture.trim())) {
      result.picture = 'A imagem deve ser uma URL começando com http:// ou https://';
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

    const data: ProductInput = {
      name: name.trim(),
      description: description.trim(),
      price: Math.round(Number(price) * 100) / 100,
      picture: picture.trim() || null,
      active,
      isVegetarian,
      isNew,
      categoryId: categoryId === NO_CATEGORY ? null : categoryId
    };

    if (product) {
      updateProduct.mutate({ id: product.id, data }, { onSuccess: onDone });
    } else {
      createProduct.mutate(data, { onSuccess: onDone });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="product-name">Nome *</Label>
        <Input
          id="product-name"
          value={name}
          maxLength={60}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={!!errors.name}
        />
        <FieldError message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-description">Descrição</Label>
        <Textarea
          id="product-description"
          value={description}
          rows={3}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-price">Preço (R$) *</Label>
          <Input
            id="product-price"
            type="number"
            min={0.01}
            step={0.01}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            aria-invalid={!!errors.price}
          />
          <FieldError message={errors.price} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Categoria</Label>
          <Select
            items={categoryItems}
            value={categoryId}
            onValueChange={(value) => setCategoryId(value ?? NO_CATEGORY)}
            disabled={loadingCategories}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-picture">Imagem (URL)</Label>
        <Input
          id="product-picture"
          value={picture}
          placeholder="https://..."
          onChange={(event) => setPicture(event.target.value)}
          aria-invalid={!!errors.picture}
        />
        <FieldError message={errors.picture} />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Switch id="product-vegetarian" checked={isVegetarian} onCheckedChange={setIsVegetarian} />
          <Label htmlFor="product-vegetarian">Vegetariano</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="product-new" checked={isNew} onCheckedChange={setIsNew} />
          <Label htmlFor="product-new">Novidade</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="product-active" checked={active} onCheckedChange={setActive} />
          <Label htmlFor="product-active">Ativo</Label>
        </div>
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
