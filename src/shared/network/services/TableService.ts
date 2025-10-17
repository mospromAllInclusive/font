import { network } from "../shared/network";
import type { AxiosError } from "axios";
import { type GetColumnDTO } from "../dto/GetColumnDTO";
import { type GetTableDTO } from "../dto/GetTableDTO";
import { type Response } from "../shared/Response";

class TableService {
  async getTable(tableId: string): Promise<Response<GetTableDTO>> {
    try {
      const { data } = await network.get(`/table/${tableId}`);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async getTableColumns(tableId: string): Promise<Response<GetColumnDTO[]>> {
    try {
      const { data } = await network.get(`/table/${tableId}/columns`);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async addEmptyTableToDatabase(tableName: string, dbId: string) {
    try {
      const { data } = await network.post(`/table`, {
        tableName,
        dbId,
      });

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async createColumn(tableId: string, column: { name: string; type: string }) {
    try {
      const { data } = await network.post(`/table/column`, {
        tableId,
        column,
      });

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async deleteColumn(tableId: string, columnId: string) {
    try {
      const { data } = await network.delete(`/table/column`, {
        data: { tableId, columnId },
      });

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const tableService = new TableService();
