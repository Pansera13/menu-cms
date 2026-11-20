import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatTime } from "@/lib/format";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderStatusSelect } from "./order-status-select";

type OrderCardProps = {
  order: OrderDTO;
  index: number;
}

export function OrderCard({ order, index }: OrderCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CardTitle>Pedido {index}</CardTitle>
          <span className="text-sm text-muted-foreground">às {formatTime(order.createdAt)}</span>
          <OrderStatusBadge status={order.status} />
        </div>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-center">Qtd.</TableHead>
              <TableHead className="text-right">Preço unit.</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end gap-2 text-base">
        <span className="text-muted-foreground">Total do pedido:</span>
        <span className="font-bold">{formatCurrency(order.total)}</span>
      </CardFooter>
    </Card>
  )
}
