import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MenuTableWork } from "@entity";
import { useLocation } from "react-router-dom";
import { useViewModel } from "./hooks/useViewModel";
import type { GetTableDataDTO } from "@shared/network";
import { TableInfoProvider } from "@shared/context";
import { TableColumnsEditor } from "../TableColumnsEditor";
import { TableGridEditor } from "../TableGridEditor";
import type { TableMenuPanel } from "@shared/model";

export const TableWorkArea = () => {
  const { activePanel, getTable, setTableMenuActivePanel } = useViewModel();

  const location = useLocation();

  const [tableInfo, setTableInfo] = useState<GetTableDataDTO | null>(null);

  const tableName = tableInfo?.table?.name || "Неизвестная таблица";

  const handleUpdateTableInfo = async () => {
    const path = location.pathname;

    if (!path.startsWith("/table-item")) return;

    const tableId = path.split("/").at(-1);

    if (!tableId) return;

    const response = await getTable(tableId);

    if (response.error) {
      setTableInfo(null);
      return;
    }

    setTableInfo(response.data);
  };

  const handleSelectTab = (tab: TableMenuPanel) => {
    setTableMenuActivePanel(tab);
  };

  useEffect(() => {
    handleUpdateTableInfo();
  }, [location]);

  return (
    <TableInfoProvider value={tableInfo}>
      <Box
        maxHeight="100%"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        paddingLeft={2}
        paddingRight={2}
        paddingBottom={2}
      >
        <Box className="TableWorkArea-header" marginTop="3px">
          <Typography variant="h6">{tableName}</Typography>

          <MenuTableWork
            activeValue={activePanel}
            onSelectTab={handleSelectTab}
          />
        </Box>

        {tableInfo && (
          <>
            {activePanel !== "columns" && (
              <TableGridEditor
                flex="1"
                height="100%"
                overflow="hidden"
                marginTop="10px"
              />
            )}

            {activePanel === "columns" && (
              <TableColumnsEditor
                flex="1"
                height="100%"
                overflow="hidden"
                marginTop="10px"
              />
            )}
          </>
        )}
      </Box>
    </TableInfoProvider>
  );
};
