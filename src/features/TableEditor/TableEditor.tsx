import { useMemo, useState } from "react";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { AddRowAction } from "../AddRowAction";
import { useViewModel } from "./hooks/useViewModel";
import { useLifecycles } from "react-use";
import { Box } from "@mui/material";
import { SuccessAddRowEvent } from "../AddRowAction";
import type { GetTableDataDTO } from "@shared/network";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const TableEditor = ({ tableId }: { tableId: string }) => {
  const { fetchTableData } = useViewModel();

  const [tableInfo, setTableInfo] = useState<GetTableDataDTO | null>(null);

  const handleUpdateTableInfo = async () => {
    const response = await fetchTableData(tableId);

    if (response.error) {
      setTableInfo(null);
      return;
    }

    setTableInfo(response.data);
  };

  const gridColumns: GridColDef[] = useMemo(() => {
    if (!tableInfo) return [];

    const columns = tableInfo.table.columns;

    return columns.map((col) => {
      return {
        name: `${col.name}_${col.id}`,
        field: col.id,
        headerName: col.name,
      };
    });
  }, [tableInfo]);

  const gridRows: GridRowsProp[] = useMemo(() => {
    if (!tableInfo) return [];

    const record: GridRowsProp[] = [];

    tableInfo.rows.forEach((row) => {
      record.push({ id: row.id, ...row.data } as unknown as GridRowsProp);
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
      rowSelection={true}
      editMode="row"
      autosizeOnMount
      disableRowSelectionOnClick
      showCellVerticalBorder
      showColumnVerticalBorder
      sx={{ width: "100%", borderRadius: "8px" }}
      rows={gridRows}
      columns={gridColumns}
      slots={{
        footer: () => (
          <GridFooterContainer>
            <Box pl={1}>
              <AddRowAction
                tableId={tableId}
                columns={tableInfo?.table.columns || []}
              />
            </Box>

            <GridPagination />
          </GridFooterContainer>
        ),
      }}
    />
  );
};
