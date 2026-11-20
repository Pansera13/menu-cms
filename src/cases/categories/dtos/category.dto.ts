export interface CategoryDTO {
  id: string;
  name: string;
  icon: string | null;
  displayOrder: number;
  active: boolean;
}

// Dados enviados para a API no cadastro e na edição
export interface CategoryInput {
  name: string;
  icon: string | null;
  displayOrder: number;
  active: boolean;
}
