import { network } from "../shared/network";
import type { AxiosError } from "axios";
import type { GetTableDataDTO } from "../dto/table/GetTableDataDTO";
import type { GetTableMetaDTO } from "../dto/table/GetTableMetaDTO";
import { type Response } from "../shared/Response";
import camelcaseKeys from "camelcase-keys";

class TableService {
  async getTable(tableId: string): Promise<Response<GetTableDataDTO>> {
    try {
      console.log("tableId ;>> ", tableId);
      const { data } = await network.get(`/tables/${tableId}`);
      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async getTableMeta(tableId: string): Promise<Response<GetTableMetaDTO>> {
    try {
      const { data } = await network.get(`/tables/${tableId}/info`);
      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async addEmptyTableToDatabase(tableName: string, dbId: string) {
    try {
      const { data } = await network.post(`/tables/create`, {
        name: tableName,
        database_id: dbId,
        columns: [],
      });

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async createColumn(tableId: string, column: { name: string; type: string }) {
    try {
      const { data } = await network.post(`/tables/add-column`, {
        table_id: tableId,
        column,
      });

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async deleteColumn(tableId: string, columnId: string) {
    try {
      const { data } = await network.post("/tables/delete-column", {
        table_id: tableId,
        column_id: columnId,
      });

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const tableService = new TableService();
