import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  price: string;
  picture: string | null;
  active: boolean;
  isVegetarian: boolean;
  isNew: boolean;
  category: CategoryDTO | null;
}

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
