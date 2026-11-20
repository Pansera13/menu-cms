import { isAxiosError } from 'axios';

// Extrai a mensagem de erro devolvida pela API NestJS
export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar à API. Verifique se o backend está rodando.';
    }

    const message = error.response.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string') {
      return message;
    }
  }

  return 'Ocorreu um erro inesperado.';
}
