import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MenuTableWork } from "@entity";
import { TableEditor } from "@features";
import { useLocation } from "react-router-dom";
import { useViewModel } from "./hooks/useViewModel";
import {
  AddColumnAction,
  DeleteColumnAction,
  TableColumnList,
} from "@features";

import type { TableMenuPanel } from "@shared/model";
import { getTableIdFromPageUrl } from "@shared/utils";
import type { GetTableMetaDTO } from "src/shared/network/dto/table/GetTableMetaDTO";

export const TableWorkArea = () => {
  const { activePanel, getTableInfo, setTableMenuActivePanel } = useViewModel();

  const location = useLocation();

  const [tableMeta, setTableMeta] = useState<GetTableMetaDTO | null>(null);

  const handleUpdateTableInfo = async () => {
    const path = location.pathname;

    const tableId = getTableIdFromPageUrl(path);

    if (!tableId) return;

    const response = await getTableInfo(tableId);

    if (response.error) {
      return;
    }

    setTableMeta(response.data);
  };

  const handleSelectTab = (tab: TableMenuPanel) => {
    setTableMenuActivePanel(tab);
  };

  useEffect(() => {
    handleUpdateTableInfo();
  }, [location]);

  return (
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
        <Typography variant="h6">
          {tableMeta?.name || "Неизвестная таблица"}
        </Typography>

        <MenuTableWork
          activeValue={activePanel}
          onSelectTab={handleSelectTab}
        />
      </Box>

      {tableMeta && (
        <>
          {activePanel !== "columns" && (
            <Box flex="1" height="100%" overflow="hidden" marginTop="10px">
              <TableEditor key={tableMeta.id} tableId={tableMeta.id} />
            </Box>
          )}

          {activePanel === "columns" && (
            <Box display="flex" alignItems="flex-start" flexDirection="column">
              <AddColumnAction tableId={tableMeta.id} />

              <TableColumnList
                key={tableMeta.id}
                tableId={tableMeta.id}
                defaultColumns={tableMeta.columns}
                itemActionSlot={(column) => (
                  <DeleteColumnAction tableId={tableMeta.id} {...column} />
                )}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
