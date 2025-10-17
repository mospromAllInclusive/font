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
      <AddColumnAction tableId={tableInfo.id} />

      <TableColumnList
        key={tableInfo.id}
        tableId={tableInfo.id}
        itemActionSlot={(column) => (
          <DeleteColumnAction tableId={tableInfo.id} {...column} />
        )}
      />
    </Box>
  );
};
