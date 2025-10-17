import { useMemo } from "react";
import { DataGrid, type GridRowId } from "@mui/x-data-grid";
import { useViewModel } from "./hooks/useViewModel";
import { useTableGrid } from "./hooks/useTableGrid";

export const TableEditor = () => {
  const { selectedRowIds, handleSetSelectedRows } = useViewModel();

  const { gridColumns, gridRows } = useTableGrid();

  const handleSelectRow = (selectedIds: Set<GridRowId>) => {
    handleSetSelectedRows(selectedIds);
  };

  const selectedRowIdsSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds]
  );

  return (
    <DataGrid
      rowSelection={true}
      editMode="row"
      autosizeOnMount
      disableRowSelectionOnClick
      showCellVerticalBorder
      showColumnVerticalBorder
      rowSelectionModel={{ type: "include", ids: selectedRowIdsSet }}
      onRowSelectionModelChange={({ ids }) => handleSelectRow(ids)}
      sx={{ width: "100%", borderRadius: "8px" }}
      rows={gridRows}
      columns={gridColumns}
    />
  );
};
