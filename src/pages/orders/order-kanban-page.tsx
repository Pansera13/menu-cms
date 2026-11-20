import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { KanbanBoard } from "@/cases/orders/components/kanban/kanban-board";
import { useOrders } from "@/cases/orders/hooks/use-order";

// Intervalo para buscar novos pedidos feitos pelas mesas (30 segundos)
const REFRESH_INTERVAL = 30_000;

export function OrderKanbanPage() {
  const { data = [], isLoading, isError, error, refetch, isFetching } = useOrders({}, REFRESH_INTERVAL);

  // o quadro mostra apenas pedidos de comandas que ainda estão abertas
  const orders = data.filter((order) => order.guestCheck.status === 'OPENED');

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pedidos"
        description="Arraste os cartões entre as colunas para alterar o status do pedido."
        actions={
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={isFetching ? 'animate-spin' : undefined} /> Atualizar
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState rows={4} />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : orders.length === 0 ? (
        <EmptyState message="Nenhum pedido em comandas abertas." />
      ) : (
        <KanbanBoard orders={orders} />
      )}
    </div>
  )
}
