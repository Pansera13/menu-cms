import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { ProductService } from "../services/product.service";
import type { ProductInput } from "../dtos/product.dto";

const QUERY_KEY = ['products'];

export function useProducts(categoryId?: string) {
  return useQuery({
    // a categoria faz parte da chave: cada filtro tem seu próprio cache
    queryKey: [...QUERY_KEY, categoryId],
    queryFn: () => ProductService.listAll(categoryId)
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductInput) => ProductService.create(data),
    onSuccess: () => {
      // invalida todas as listas de produtos, com ou sem filtro
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Produto cadastrado com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) => ProductService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Produto atualizado com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Produto excluído com sucesso!');
    },
    onError: (error) => toast.error(getApiErrorMessage(error))
  });
}
