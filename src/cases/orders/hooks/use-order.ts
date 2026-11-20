import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { OrderService } from "../services/order.service";
import { ORDER_STATUS_LABEL } from "../order-status";
import type { OrderDTO, OrderFilters, OrderStatus } from "../dtos/order.dto";

const QUERY_KEY = ['orders'];

export function useOrders(filters: OrderFilters = {}, refetchInterval?: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, filters],
    queryFn: () => OrderService.listAll(filters),
    refetchInterval
  });
}

type UpdateStatusVariables = {
  id: string;
  status: OrderStatus;
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusVariables) => OrderService.updateStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY });

      queryClient.setQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY }, (orders) =>
        orders?.map((order) => (order.id === id ? { ...order, status } : order))
      );

      return { previous };
    },

    onSuccess: (_order, { status }) => {
      toast.success(`Status alterado para "${ORDER_STATUS_LABEL[status]}".`);
    },

    onError: (error, _variables, context) => {
      context?.previous.forEach(([queryKey, data]) => queryClient.setQueryData(queryKey, data));
      toast.error(getApiErrorMessage(error));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    }
  });
}
