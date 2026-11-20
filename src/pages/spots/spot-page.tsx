import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { ConfirmDeleteDialog } from "@/components/feedback/confirm-delete-dialog";
import { SpotTable } from "@/cases/spots/components/spot-table";
import { SpotFormDialog } from "@/cases/spots/components/spot-form-dialog";
import { useDeleteSpot, useSpots } from "@/cases/spots/hooks/use-spot";
import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";

export function SpotPage() {
  const { data: spots = [], isLoading, isError, error, refetch } = useSpots();
  const deleteSpot = useDeleteSpot();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<SpotDTO | null>(null);
  const [deleting, setDeleting] = useState<SpotDTO | null>(null);

  function handleNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleEdit(spot: SpotDTO) {
    setEditing(spot);
    setFormOpen(true);
  }

  function handleConfirmDelete() {
    if (!deleting) return;
    deleteSpot.mutate(deleting.id, {
      onSettled: () => setDeleting(null)
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mesas"
        description="Cadastre as mesas do restaurante."
        actions={
          <Button onClick={handleNew}>
            <Plus /> Nova mesa
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : spots.length === 0 ? (
        <EmptyState message="Nenhuma mesa cadastrada." />
      ) : (
        <SpotTable spots={spots} onEdit={handleEdit} onDelete={setDeleting} />
      )}

      <SpotFormDialog open={formOpen} onOpenChange={setFormOpen} spot={editing} />

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Excluir mesa"
        description={`Tem certeza que deseja excluir "${deleting?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isPending={deleteSpot.isPending}
      />
    </div>
  )
}
