import { type GridColDef } from "@mui/x-data-grid";
import { useTableInfoContext } from "@shared/context";
import { useAppSelector } from "@shared/model";
import { useMemo } from "react";

export const useTableGrid = () => {
  const tableMenuActivePanel = useAppSelector(
    (state) => state.tableMenu.activePanel
  );

  const { columns, rows } = useTableInfoContext();

  const gridRows = useMemo(() => {
    return rows.map((row, rowIdx) => {
      return row.reduce((acc, curr) => {
        acc.id = rowIdx;

        acc[curr.columnName] = curr.data;

        return acc;
      }, {} as Record<string, unknown>);
    });
  }, [rows]);

  const gridColumns: GridColDef[] = useMemo(() => {
    const record: GridColDef[] = [];

    columns.forEach(({ name }) => {
      record.push({
        field: name,
        headerName: name,
        editable: true,
      });
    });

    return record;
  }, [columns, tableMenuActivePanel]);

  return { gridColumns, gridRows };
};
