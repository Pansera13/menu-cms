import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { SpotService } from "../services/spot.service";
import type { SpotInput } from "../dtos/spot.dto";

const QUERY_KEY = ['spots'];

export function useSpots() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: SpotService.listAll
  });
}

export function useCreateSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SpotInput) => SpotService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Mesa cadastrada com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useUpdateSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SpotInput }) => SpotService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['guest-checks'] });
      toast.success('Mesa atualizada com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useDeleteSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SpotService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Mesa excluída com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}
