import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { ConfirmDeleteDialog } from "@/components/feedback/confirm-delete-dialog";
import { CategoryTable } from "@/cases/categories/components/category-table";
import { CategoryFormDialog } from "@/cases/categories/components/category-form-dialog";
import { useCategories, useDeleteCategory } from "@/cases/categories/hooks/use-category";
import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export function CategoryPage() {
  const { data: categories = [], isLoading, isError, error, refetch } = useCategories();
  const deleteCategory = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryDTO | null>(null);
  const [deleting, setDeleting] = useState<CategoryDTO | null>(null);

  function handleNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleEdit(category: CategoryDTO) {
    setEditing(category);
    setFormOpen(true);
  }

  function handleConfirmDelete() {
    if (!deleting) return;
    deleteCategory.mutate(deleting.id, {
      onSettled: () => setDeleting(null)
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Categorias"
        description="Organize as seções do cardápio digital."
        actions={
          <Button onClick={handleNew}>
            <Plus /> Nova categoria
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : categories.length === 0 ? (
        <EmptyState message="Nenhuma categoria cadastrada." />
      ) : (
        <CategoryTable categories={categories} onEdit={handleEdit} onDelete={setDeleting} />
      )}

      <CategoryFormDialog open={formOpen} onOpenChange={setFormOpen} category={editing} />

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Excluir categoria"
        description={`Tem certeza que deseja excluir a categoria "${deleting?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isPending={deleteCategory.isPending}
      />
    </div>
  )
}
