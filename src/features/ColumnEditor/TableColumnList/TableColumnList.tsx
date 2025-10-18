import { useState, type ReactNode, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useLifecycles } from "react-use";
import { useViewModel } from "./hooks/useViewModel";
import { SuccessAddColumn } from "../AddColumnAction";
import { SuccessDeleteColumn } from "../DeleteColumnAction";
import type { GetColumnDTO } from "@shared/network";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

type TableColumnListProps = {
  tableId: string;
  itemActionSlot: (column: GetColumnDTO) => ReactNode;
};

export const TableColumnList = ({
  tableId,
  itemActionSlot,
}: TableColumnListProps) => {
  const { getTableMetaInfo } = useViewModel();
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();

  const [columns, setColumns] = useState<GetColumnDTO[]>([]);

  const handleFetchColumns = async () => {
    const response = await getTableMetaInfo(tableId);

    if (response.error) {
      setColumns([]);
      enqueueSnackbar("Не удается получить колонки таблицы!", {
        variant: "error",
      });
      return;
    }

    const tableMeta = response.data;

    setColumns(tableMeta.columns);
  };

  useLifecycles(
    () => {
      handleFetchColumns();

      window.addEventListener(SuccessAddColumn, handleFetchColumns);
      window.addEventListener(SuccessDeleteColumn, handleFetchColumns);
    },
    () => {
      window.removeEventListener(SuccessAddColumn, handleFetchColumns);
      window.removeEventListener(SuccessDeleteColumn, handleFetchColumns);
    }
  );

  return (
    <List
      sx={{
        width: "100%",
        display: "flex",
        flex: "1",
        overflow: "auto",
        height: "100%",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {columns.map((col) => (
        <ListItem
          key={col.id}
          sx={{ padding: 0 }}
          secondaryAction={itemActionSlot(col)}
        >
          <ListItemButton
            sx={{ background: palette.grey[200], borderRadius: "8px" }}
          >
            <ListItemText primary={col.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
