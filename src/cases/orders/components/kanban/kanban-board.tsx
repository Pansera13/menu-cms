import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import type { OrderDTO, OrderStatus } from "../../dtos/order.dto";
import { ORDER_STATUSES } from "../../order-status";
import { useUpdateOrderStatus } from "../../hooks/use-order";
import { KanbanColumn } from "./kanban-column";

type KanbanBoardProps = {
  orders: OrderDTO[];
}

export function KanbanBoard({ orders }: KanbanBoardProps) {
  const updateStatus = useUpdateOrderStatus();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const orderId = String(active.id);
    const newStatus = over.id as OrderStatus;
    const order = orders.find((item) => item.id === orderId);

    if (order && order.status !== newStatus) {
      updateStatus.mutate({ id: orderId, status: newStatus });
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ORDER_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            orders={orders.filter((order) => order.status === status)}
          />
        ))}
      </div>
    </DndContext>
  )
}
