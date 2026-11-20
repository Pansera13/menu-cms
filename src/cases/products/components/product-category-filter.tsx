import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/cases/categories/hooks/use-category";

// Valor usado no select para representar "todas as categorias"
const ALL = 'all';

type ProductCategoryFilterProps = {
  value?: string;
  onChange: (categoryId?: string) => void;
}

export function ProductCategoryFilter({ value, onChange }: ProductCategoryFilterProps) {
  const { data: categories = [], isLoading } = useCategories();

  const items = [
    { value: ALL, label: 'Todas as categorias' },
    ...categories.map((category) => ({ value: category.id, label: category.name }))
  ];

  return (
    <Select
      items={items}
      value={value ?? ALL}
      onValueChange={(selected) => onChange(!selected || selected === ALL ? undefined : selected)}
      disabled={isLoading}
    >
      <SelectTrigger className="w-56 bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
