import type { GridRowId } from "@mui/x-data-grid";
import { tableActions } from "@shared/model";
import { useAppDispatch, useAppSelector } from "@shared/model";
import { tableService } from "@shared/network";

export const useViewModel = () => {
  const dispatch = useAppDispatch();
  const selectedRowIds = useAppSelector((state) => state.table.selectedRowIds);

  const handleSetSelectedRows = (ids: Set<GridRowId>) => {
    dispatch(tableActions.setSelectedRows([...ids]));
  };

  const fetchTableData = async (tableId: string) => {
    return await tableService.getTable(tableId);
  };

  const updateTableCell = async (
    tableId: string,
    rowId: string,
    colId: string,
    value: unknown
  ) => {
    return await tableService.setTableCell(tableId, rowId, colId, value);
  };

  return {
    selectedRowIds,
    fetchTableData,
    handleSetSelectedRows,
    updateTableCell,
  };
};
