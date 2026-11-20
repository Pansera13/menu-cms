import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { ConfirmDeleteDialog } from "@/components/feedback/confirm-delete-dialog";
import { ProductTable } from "@/cases/products/components/product-table";
import { ProductFormDialog } from "@/cases/products/components/product-form-dialog";
import { ProductCategoryFilter } from "@/cases/products/components/product-category-filter";
import { useDeleteProduct, useProducts } from "@/cases/products/hooks/use-product";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export function ProductPage() {
  // o filtro fica na URL (?category=...), assim sobrevive a um recarregamento da página
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category') ?? undefined;

  const { data: products = [], isLoading, isError, error, refetch } = useProducts(categoryId);
  const deleteProduct = useDeleteProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProductDTO | null>(null);
  const [deleting, setDeleting] = useState<ProductDTO | null>(null);

  function handleFilterChange(selected?: string) {
    setSearchParams(selected ? { category: selected } : {});
  }

  function handleNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleEdit(product: ProductDTO) {
    setEditing(product);
    setFormOpen(true);
  }

  function handleConfirmDelete() {
    if (!deleting) return;
    deleteProduct.mutate(deleting.id, {
      onSettled: () => setDeleting(null)
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Produtos"
        description="Gerencie os itens do cardápio."
        actions={
          <>
            <ProductCategoryFilter value={categoryId} onChange={handleFilterChange} />
            <Button onClick={handleNew}>
              <Plus /> Novo produto
            </Button>
          </>
        }
      />

      {isLoading ? (
        <LoadingState rows={6} />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState message={categoryId ? 'Nenhum produto nesta categoria.' : 'Nenhum produto cadastrado.'} />
      ) : (
        <ProductTable products={products} onEdit={handleEdit} onDelete={setDeleting} />
      )}

      <ProductFormDialog open={formOpen} onOpenChange={setFormOpen} product={editing} />

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Excluir produto"
        description={`Tem certeza que deseja excluir o produto "${deleting?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isPending={deleteProduct.isPending}
      />
    </div>
  )
}
