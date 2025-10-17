import { Box, type BoxProps } from "@mui/material";
import {
  AddColumnAction,
  TableColumnList,
  DeleteColumnAction,
} from "@features";
import { useTableInfoContext } from "@shared/context";

export const TableColumnsEditor = (boxProps: BoxProps) => {
  const tableInfo = useTableInfoContext();

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      flexDirection="column"
      {...boxProps}
    >
      <AddColumnAction tableId={tableInfo.table.id} />

      <TableColumnList
        key={tableInfo.table.id}
        tableId={tableInfo.table.id}
        itemActionSlot={(column) => (
          <DeleteColumnAction tableId={tableInfo.table.id} {...column} />
        )}
      />
    </Box>
  );
};
