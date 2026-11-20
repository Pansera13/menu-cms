import { api } from "@/lib/axios";
import type { OrderDTO, OrderFilters, OrderStatus } from "../dtos/order.dto";

const ENDPOINT = '/orders';

export const OrderService = {

  async listAll(filters: OrderFilters = {}): Promise<OrderDTO[]> {
    const result = await api.get<OrderDTO[]>(ENDPOINT, {
      params: {
        guestCheck: filters.guestCheckId,
        status: filters.status
      }
    });
    return result.data;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<OrderDTO> {
    const result = await api.patch<OrderDTO>(`${ENDPOINT}/${id}/status`, { status });
    return result.data;
  }

}
