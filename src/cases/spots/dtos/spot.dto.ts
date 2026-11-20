export interface SpotDTO {
  id: string;
  name: string;
  active: boolean;
}

// Dados enviados para a API no cadastro e na edição
export interface SpotInput {
  name: string;
  active: boolean;
}
