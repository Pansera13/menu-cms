import axios from 'axios';

// Única instância do Axios do projeto: a URL da API vem do arquivo .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
