import { useState, useEffect } from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { AddRowAction } from "../AddRowAction";
import { useViewModel } from "./hooks/useViewModel";
import { Box, Button } from "@mui/material";
import { SuccessAddRowEvent } from "../AddRowAction";
import { useTableGrid } from "./hooks/useTableGrid";
import type { GetTableDataDTO } from "@shared/network";
import { RowsDeleteEvent } from "./events/RowsDeleteEvent";
import { useRowChange } from "./hooks/useRowChange";
import { useNavigationMeta } from "./hooks/useNavigationMeta";
import { TablePaginator } from "@entity";

export const TableEditor = ({ tableId }: { tableId: string }) => {
  const { fetchTableData } = useViewModel();

  const [isLoading, setIsLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState<GetTableDataDTO | null>(null);

  const {
    filterText,
    filterCol,
    setFilterText,
    setFilterCol,
    sortMeta,
    paginationMeta,
    setPaginationMeta,
    handleSort,
  } = useNavigationMeta();

  const { gridColumns, gridRows } = useTableGrid(tableInfo);

  const {
    selectedRows,
    handleDeleteRows: deleteRows,
    handleRowUpdate,
    handleSelectRows,
  } = useRowChange(tableId);

  const handleUpdateTableInfo = async () => {
    setIsLoading(true);
    const response = await fetchTableData(tableId, paginationMeta, sortMeta, {
      filterCol,
      filterText,
    });
    setIsLoading(false);

    if (response.error) {
      setTableInfo(null);
      return;
    }

    setTableInfo(response.data);
  };

  const handleDeleteRows = async () => {
    setIsLoading(true);
    await deleteRows();
    setIsLoading(false);
  };

  useEffect(() => {
    handleUpdateTableInfo();

    window.addEventListener(SuccessAddRowEvent, handleUpdateTableInfo);
    window.addEventListener(RowsDeleteEvent, handleUpdateTableInfo);

    return () => {
      window.removeEventListener(SuccessAddRowEvent, handleUpdateTableInfo);
      window.removeEventListener(RowsDeleteEvent, handleUpdateTableInfo);
    };
  }, [paginationMeta, sortMeta, filterText]);

  return (
    <DataGrid
      autosizeOnMount
      disableRowSelectionOnClick
      showCellVerticalBorder
      showColumnVerticalBorder
      rowSelection
      filterDebounceMs={300}
      checkboxSelection
      onFilterModelChange={(model) => {
        const filterItem = model.items[0];

        if (!filterItem) {
          setFilterCol(undefined);
          setFilterText(undefined);
          return model;
        }

        setFilterCol(filterItem.field);
        setFilterText(filterItem.value);

        return model;
      }}
      onSortModelChange={handleSort}
      rowSelectionModel={{ type: "include", ids: selectedRows }}
      onRowSelectionModelChange={(select) => {
        handleSelectRows(select.ids);
      }}
      processRowUpdate={handleRowUpdate}
      sx={{ width: "100%", borderRadius: "8px" }}
      rows={gridRows}
      loading={isLoading}
      columns={gridColumns}
      autosizeOptions={{
        includeOutliers: true,
        includeHeaders: true,
        outliersFactor: 1.5,
        expand: true,
      }}
      slotProps={{
        filterPanel: {
          disableAddFilterButton: true,
        },
      }}
      slots={{
        footer: () => (
          <GridFooterContainer>
            <Box display="flex" pl={1} gap={2}>
              {gridColumns.length > 0 && (
                <AddRowAction
                  tableId={tableId}
                  columns={tableInfo?.table.columns || []}
                />
              )}
              {selectedRows.size > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteRows}
                >
                  Удалить строки
                </Button>
              )}
            </Box>

            {tableInfo && (
              <TablePaginator
                page={paginationMeta.page}
                pageSize={paginationMeta.pageSize}
                totalItems={tableInfo.table.totalRows}
                onChangePaginationMeta={setPaginationMeta}
              />
            )}
          </GridFooterContainer>
        ),
      }}
    />
  );
};
