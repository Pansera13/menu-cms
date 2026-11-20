import type { OrderStatus } from "./dtos/order.dto";

// Ordem em que os status aparecem nos selects e nas colunas do Kanban
export const ORDER_STATUSES: OrderStatus[] = ['NEW', 'PREPARING', 'READY', 'DELIVERED'];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  NEW: 'Novo',
  PREPARING: 'Em preparo',
  READY: 'Pronto',
  DELIVERED: 'Entregue',
};

// Cor de cada status, usada nos badges e no topo das colunas do Kanban
export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  NEW: 'bg-sky-100 text-sky-800 border-sky-200',
  PREPARING: 'bg-amber-100 text-amber-800 border-amber-200',
  READY: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  DELIVERED: 'bg-zinc-200 text-zinc-700 border-zinc-300',
};
