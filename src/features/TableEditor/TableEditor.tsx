import { useMemo, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useViewModel } from "./hooks/useViewModel";
import type { GetTableDataDTO } from "@shared/network";

export const TableEditor = ({ tableId }: { tableId: string }) => {
  const { selectedRowIds, fetchTableData } = useViewModel();

  const [tableInfo, setTableInfo] = useState<GetTableDataDTO | null>(null);

  const handleUpdateTableInfo = async () => {
    const response = await fetchTableData(tableId);

    if (response.error) {
      setTableInfo(null);
      return;
    }

    setTableInfo(response.data);
  };

  const selectedRowIdsSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds]
  );

  useEffect(() => {
    handleUpdateTableInfo();
  }, [location]);

  return (
    <DataGrid
      rowSelection={true}
      editMode="row"
      autosizeOnMount
      disableRowSelectionOnClick
      showCellVerticalBorder
      showColumnVerticalBorder
      rowSelectionModel={{ type: "include", ids: selectedRowIdsSet }}
      sx={{ width: "100%", borderRadius: "8px" }}
      rows={[]}
      columns={[]}
    />
  );
};
