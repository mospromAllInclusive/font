import { type GridColDef } from "@mui/x-data-grid";
import { useTableInfoContext } from "@shared/context";
import { useAppSelector } from "@shared/model";
import { useMemo } from "react";

export const useTableGrid = () => {
  const tableMenuActivePanel = useAppSelector(
    (state) => state.tableMenu.activePanel
  );

  const { table } = useTableInfoContext();

  const tableColumns = table.columns;

  // const convertRowsToGridRows = () => {
  //   try {
  //     return rows.map((row, rowIdx) => {
  //       return row.reduce((acc, curr) => {
  //         acc.id = rowIdx;

  //         acc[curr.columnName] = curr.data;

  //         return acc;
  //       }, {} as Record<string, unknown>);
  //     });
  //   } catch {
  //     return [];
  //   }
  // };

  const convertColsToGridCols = () => {
    try {
      const record: GridColDef[] = [];

      tableColumns.forEach(({ id, name }) => {
        record.push({
          field: `${name}_${id}`,
          headerName: name,
          editable: true,
        });
      });

      return record;
    } catch {
      return [];
    }
  };

  // const gridRows = useMemo(() => {
  //   return convertRowsToGridRows();
  // }, [rows]);

  const gridColumns: GridColDef[] = useMemo(() => {
    return convertColsToGridCols();
  }, [tableColumns, tableMenuActivePanel]);

  return { gridColumns, gridRows: [] };
};
