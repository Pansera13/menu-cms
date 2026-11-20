import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "../dtos/order.dto";
import { ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from "../order-status";

type OrderStatusBadgeProps = {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(ORDER_STATUS_COLOR[status])}>
      {ORDER_STATUS_LABEL[status]}
    </Badge>
  )
}
