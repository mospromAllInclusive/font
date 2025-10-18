import { network } from "../shared/network";
import type { Response } from "../shared/Response";
import type { AxiosError } from "axios";
import type { GetChangeItemDTO } from "../dto";
import camelcaseKeys from "camelcase-keys";

class ChangeLogService {
  async getTableChanges(
    tableId: string
  ): Promise<Response<GetChangeItemDTO[]>> {
    try {
      const { data } = await network.post(`/changelog/table`, {
        table_id: tableId,
      });

      return { data: camelcaseKeys(data, { deep: true }), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const changeLogService = new ChangeLogService();
