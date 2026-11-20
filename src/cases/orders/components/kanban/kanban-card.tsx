import { useDraggable } from "@dnd-kit/core";
import { Clock, GripVertical, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatTime } from "@/lib/format";
import type { OrderDTO } from "../../dtos/order.dto";

type KanbanCardProps = {
  order: OrderDTO;
}

export function KanbanCard({ order }: KanbanCardProps) {
  // o id do pedido identifica o cartão arrastado no onDragEnd do quadro
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'cursor-grab touch-none rounded-xl border bg-card p-3 shadow-sm transition-shadow active:cursor-grabbing',
        isDragging && 'relative z-20 opacity-90 shadow-lg ring-2 ring-primary'
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-semibold">
          <MapPin className="size-4 text-primary" />
          {order.guestCheck.spot.name}
        </span>
        <GripVertical className="size-4 text-muted-foreground" />
      </div>

      <ul className="mb-3 flex flex-col gap-0.5 text-sm">
        {order.items.map((item) => (
          <li key={item.id}>
            <span className="font-medium">{item.quantity}x</span> {item.product.name}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {formatTime(order.createdAt)}
        </span>
        <span className="font-semibold text-foreground">{formatCurrency(order.total)}</span>
      </div>
    </div>
  )
}
