import { useMemo, useState } from "react";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { AddRowAction } from "../AddRowAction";
import { useViewModel } from "./hooks/useViewModel";
import { useLifecycles } from "react-use";
import { Box, Button } from "@mui/material";
import { SuccessAddRowEvent } from "../AddRowAction";
import type { GetTableDataDTO } from "@shared/network";
import type { GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

export const TableEditor = ({ tableId }: { tableId: string }) => {
  const { fetchTableData, updateTableCell, deleteRows } = useViewModel();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState<GetTableDataDTO | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<GridRowId>>(new Set());

  const handleUpdateTableInfo = async () => {
    setIsLoading(true);
    const response = await fetchTableData(tableId);
    setIsLoading(false);

    if (response.error) {
      setTableInfo(null);
      return;
    }

    setTableInfo(response.data);
  };

  const handleSelectRows = (selectedSet: Set<GridRowId>) => {
    setSelectedRows(selectedSet);
  };

  const handleDeleteRows = async () => {
    setIsLoading(true);

    const response = await deleteRows(tableId, [...selectedRows]);

    setSelectedRows(new Set());

    setIsLoading(false);

    if (response.error) {
      enqueueSnackbar("Не все строки были удалены успешно!", {
        variant: "error",
      });

      handleUpdateTableInfo();

      return;
    }

    enqueueSnackbar("Строки успешно удалены!", {
      variant: "success",
    });

    handleUpdateTableInfo();
  };

  const handleRowUpdate = async (newRowObj: unknown, oldRowObj: unknown) => {
    const newRow = newRowObj as Record<string, unknown>;
    const oldRow = oldRowObj as Record<string, unknown>;

    const colNames = Object.keys(newRow);

    for (const colId of colNames) {
      if (newRow[colId] === oldRow[colId]) continue;

      const response = await updateTableCell(
        tableId,
        newRow.id as string,
        colId,
        newRow[colId]
      );

      if (response.error) {
        enqueueSnackbar("Ошибка изменения ячейки!", { variant: "error" });
        return oldRow;
      }
    }

    return newRow as Record<string, unknown>;
  };

  const gridColumns: GridColDef[] = useMemo(() => {
    if (!tableInfo) return [];

    const columns = tableInfo.table.columns.map((col) => {
      return {
        field: col.id,
        headerName: col.name,
        editable: true,
      };
    });

    return columns;
  }, [tableInfo]);

  const gridRows: GridRowsProp[] = useMemo(() => {
    if (!tableInfo) return [];

    const record: GridRowsProp[] = [];

    tableInfo.rows.forEach((row) => {
      record.push({
        id: row.id,
        ...row.data,
      } as unknown as GridRowsProp);
    });

    return record;
  }, [tableInfo]);

  useLifecycles(
    () => {
      handleUpdateTableInfo();

      window.addEventListener(SuccessAddRowEvent, handleUpdateTableInfo);
    },
    () => {
      window.removeEventListener(SuccessAddRowEvent, handleUpdateTableInfo);
    }
  );

  return (
    <DataGrid
      autosizeOnMount
      disableRowSelectionOnClick
      showCellVerticalBorder
      showColumnVerticalBorder
      rowSelection
      checkboxSelection
      rowSelectionModel={{ type: "include", ids: selectedRows }}
      onRowSelectionModelChange={(select) => {
        handleSelectRows(select.ids);
      }}
      processRowUpdate={handleRowUpdate}
      sx={{ width: "100%", borderRadius: "8px" }}
      rows={gridRows}
      loading={isLoading}
      columns={gridColumns}
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

            <GridPagination />
          </GridFooterContainer>
        ),
      }}
    />
  );
};
