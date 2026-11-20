import { api } from "@/lib/axios";
import type { SpotDTO, SpotInput } from "../dtos/spot.dto";

const ENDPOINT = '/spots';

export const SpotService = {

  async listAll(): Promise<SpotDTO[]> {
    const result = await api.get<SpotDTO[]>(ENDPOINT);
    return result.data;
  },

  async create(data: SpotInput): Promise<SpotDTO> {
    // o cadastro de mesa na API aceita apenas o nome; toda mesa nasce ativa
    const result = await api.post<SpotDTO>(ENDPOINT, { name: data.name });
    return result.data;
  },

  async update(id: string, data: SpotInput): Promise<SpotDTO> {
    const result = await api.patch<SpotDTO>(`${ENDPOINT}/${id}`, data);
    return result.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  }

}
