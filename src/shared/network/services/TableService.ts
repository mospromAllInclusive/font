import { network } from "../shared/network";
import type { AxiosError } from "axios";
import type { GetTableDataDTO } from "../dto/table/GetTableDataDTO";
import type { GetTableMetaDTO } from "../dto/table/GetTableMetaDTO";
import { type Response } from "../shared/Response";
import camelcaseKeys from "camelcase-keys";

class TableService {
  async getTable(tableId: string): Promise<Response<GetTableDataDTO>> {
    try {
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

  async deleteTable(tableId: string) {
    try {
      const { data } = await network.post(`/tables/delete`, {
        table_id: tableId,
      });

      return { data, error: null };
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

  async addRow(tableId: string, row: Record<string, unknown>) {
    try {
      const { data } = await network.post(`/tables/${tableId}/add-row`, {
        table_id: tableId,
        data: row,
      });

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async deleteRow(tableId: string, rowId: string | number) {
    try {
      const { data } = await network.post(`/tables/${tableId}/delete-row`, {
        row_id: rowId,
      });

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async setTableCell(
    tableId: string,
    rowId: string,
    colId: string,
    value: unknown
  ) {
    try {
      const { data } = await network.post(`/tables/${tableId}/set-cell-value`, {
        row_id: rowId,
        column_id: colId,
        value: value,
      });

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const tableService = new TableService();
