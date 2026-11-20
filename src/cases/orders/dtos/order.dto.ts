import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";

export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'DELIVERED';

export interface OrderItemDTO {
  id: string;
  quantity: number;
  // colunas numeric chegam como texto
  price: string;
  subtotal: string;
  product: ProductDTO;
}

export interface OrderDTO {
  id: string;
  createdAt: string;
  total: string;
  status: OrderStatus;
  items: OrderItemDTO[];
  guestCheck: {
    id: string;
    status: 'OPENED' | 'CLOSED';
    createdAt: string;
    spot: SpotDTO;
  };
}

export interface OrderFilters {
  guestCheckId?: string;
  status?: OrderStatus;
}
