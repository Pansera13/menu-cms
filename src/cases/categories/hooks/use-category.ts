import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { CategoryService } from "../services/category.service";
import type { CategoryInput } from "../dtos/category.dto";

const QUERY_KEY = ['categories'];

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: CategoryService.listAll
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryInput) => CategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Categoria cadastrada com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryInput }) => CategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      // os produtos exibem o nome da categoria, então também são recarregados
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Categoria atualizada com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CategoryService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Categoria excluída com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}
