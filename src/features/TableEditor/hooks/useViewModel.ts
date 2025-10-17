import type { GridRowId } from "@mui/x-data-grid";
import { tableActions } from "@shared/model";
import { useAppDispatch, useAppSelector } from "@shared/model";

export const useViewModel = () => {
  const dispatch = useAppDispatch();
  const selectedRowIds = useAppSelector((state) => state.table.selectedRowIds);

  const handleSetSelectedRows = (ids: Set<GridRowId>) => {
    dispatch(tableActions.setSelectedRows([...ids]));
  };

  return { selectedRowIds, handleSetSelectedRows };
};
