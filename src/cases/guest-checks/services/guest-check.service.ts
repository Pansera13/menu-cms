import { api } from "@/lib/axios";
import type { GuestCheckDTO, GuestCheckSummaryDTO, GuestCheckStatus } from "../dtos/guest-check.dto";

const ENDPOINT = '/guest-checks';

export const GuestCheckService = {

  async listByStatus(status: GuestCheckStatus): Promise<GuestCheckSummaryDTO[]> {
    const result = await api.get<GuestCheckSummaryDTO[]>(ENDPOINT, {
      params: { status }
    });
    return result.data;
  },

  async findOne(id: string): Promise<GuestCheckDTO> {
    const result = await api.get<GuestCheckDTO>(`${ENDPOINT}/${id}`);
    return result.data;
  }

}
