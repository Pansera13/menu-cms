import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { OrderDTO, OrderStatus } from "../../dtos/order.dto";
import { ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from "../../order-status";
import { KanbanCard } from "./kanban-card";

type KanbanColumnProps = {
  status: OrderStatus;
  orders: OrderDTO[];
}

export function KanbanColumn({ status, orders }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={cn(
        'flex min-h-96 flex-col gap-3 rounded-2xl border bg-muted/60 p-3 transition-colors',
        isOver && 'border-primary bg-accent'
      )}
    >
      <header className={cn('flex items-center justify-between rounded-lg border px-3 py-2', ORDER_STATUS_COLOR[status])}>
        <h2 className="font-semibold">{ORDER_STATUS_LABEL[status]}</h2>
        <span className="rounded-full bg-white/70 px-2 text-sm font-semibold">{orders.length}</span>
      </header>

      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Nenhum pedido</p>
      ) : (
        orders.map((order) => <KanbanCard key={order.id} order={order} />)
      )}
    </section>
  )
}
