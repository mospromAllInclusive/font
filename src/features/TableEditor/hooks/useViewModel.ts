import type { GridRowId } from "@mui/x-data-grid";
import { tableActions } from "@shared/model";
import { useAppDispatch, useAppSelector } from "@shared/model";
import { tableService } from "@shared/network";
import type { PaginationMeta } from "./useNavigationMeta";

export const useViewModel = () => {
  const dispatch = useAppDispatch();
  const selectedRowIds = useAppSelector((state) => state.table.selectedRowIds);

  const handleSetSelectedRows = (ids: Set<GridRowId>) => {
    dispatch(tableActions.setSelectedRows([...ids]));
  };

  const fetchTableData = async (
    tableId: string,
    paginationMeta: PaginationMeta
  ) => {
    return await tableService.getTable(tableId, paginationMeta);
  };

  const updateTableCell = async (
    tableId: string,
    rowId: string,
    colId: string,
    value: unknown
  ) => {
    return await tableService.setTableCell(tableId, rowId, colId, value);
  };

  const deleteRows = async (tableId: string, rowsIds: (number | string)[]) => {
    for (const rowId of rowsIds) {
      const response = await tableService.deleteRow(tableId, rowId);

      if (response.error) {
        return response;
      }
    }

    return { error: null };
  };

  return {
    selectedRowIds,
    fetchTableData,
    handleSetSelectedRows,
    updateTableCell,
    deleteRows,
  };
};
