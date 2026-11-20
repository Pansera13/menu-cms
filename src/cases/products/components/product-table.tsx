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
import { formatCurrency } from "@/lib/format";
import { ImageOff } from "lucide-react";
import type { ProductDTO } from "../dtos/product.dto";
import { ProductFlags } from "./product-flags";

type ProductTableProps = {
  products: ProductDTO[];
  onEdit: (product: ProductDTO) => void;
  onDelete: (product: ProductDTO) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead>Indicadores</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.picture ? (
                  <img src={product.picture} alt="" className="size-14 rounded-lg object-cover" />
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <ImageOff className="size-5" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium whitespace-normal">{product.name}</TableCell>
              <TableCell>{product.category?.name ?? <span className="text-muted-foreground">Sem categoria</span>}</TableCell>
              <TableCell className="text-right font-semibold">{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <ProductFlags isVegetarian={product.isVegetarian} isNew={product.isNew} />
              </TableCell>
              <TableCell><ActiveBadge active={product.active} activeLabel="Ativo" inactiveLabel="Inativo" /></TableCell>
              <TableCell>
                <RowActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
