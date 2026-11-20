import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  // a API devolve colunas numeric do Postgres como texto
  price: string;
  picture: string | null;
  active: boolean;
  isVegetarian: boolean;
  isNew: boolean;
  category: CategoryDTO | null;
}

// Dados enviados para a API no cadastro e na edição
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  picture: string | null;
  active: boolean;
  isVegetarian: boolean;
  isNew: boolean;
  categoryId: string | null;
}
