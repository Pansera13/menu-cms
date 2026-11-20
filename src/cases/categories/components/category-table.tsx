import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActiveBadge } from "@/components/form/active-badge";
import { RowActions } from "@/components/form/row-actions";
import { Utensils } from "lucide-react";
import type { CategoryDTO } from "../dtos/category.dto";

type CategoryTableProps = {
  categories: CategoryDTO[];
  onEdit: (category: CategoryDTO) => void;
  onDelete: (category: CategoryDTO) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Ícone</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="w-24 text-center">Ordem</TableHead>
            <TableHead className="w-28">Situação</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                {category.icon ? (
                  <img src={category.icon} alt="" className="size-9" />
                ) : (
                  <Utensils className="size-9 p-1 text-brand" />
                )}
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-center">{category.displayOrder}</TableCell>
              <TableCell><ActiveBadge active={category.active} /></TableCell>
              <TableCell>
                <RowActions onEdit={() => onEdit(category)} onDelete={() => onDelete(category)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
