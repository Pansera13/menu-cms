import { useQuery } from "@tanstack/react-query";
import { GuestCheckService } from "../services/guest-check.service";

// Comandas são somente leitura no CMS: o backend abre a comanda no primeiro pedido da mesa

export function useOpenedGuestChecks() {
  return useQuery({
    queryKey: ['guest-checks', 'OPENED'],
    queryFn: () => GuestCheckService.listByStatus('OPENED')
  });
}

export function useGuestCheck(id: string) {
  return useQuery({
    queryKey: ['guest-checks', 'detail', id],
    queryFn: () => GuestCheckService.findOne(id),
    enabled: !!id
  });
}
