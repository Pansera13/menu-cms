import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "../dtos/order.dto";
import { ORDER_STATUSES, ORDER_STATUS_LABEL } from "../order-status";
import { useUpdateOrderStatus } from "../hooks/use-order";

type OrderStatusSelectProps = {
  orderId: string;
  status: OrderStatus;
}

const items = ORDER_STATUSES.map((status) => ({ value: status, label: ORDER_STATUS_LABEL[status] }));

export function OrderStatusSelect({ orderId, status }: OrderStatusSelectProps) {
  const updateStatus = useUpdateOrderStatus();

  function handleChange(value: OrderStatus | null) {
    if (value && value !== status) {
      updateStatus.mutate({ id: orderId, status: value });
    }
  }

  return (
    <Select items={items} value={status} onValueChange={handleChange} disabled={updateStatus.isPending}>
      <SelectTrigger className="w-40 bg-card" aria-label="Alterar status do pedido">
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
