import { Box, type BoxProps } from "@mui/material";
import {
  AddColumnAction,
  TableColumnList,
  DeleteColumnAction,
} from "@features";

export const TableColumnsEditor = ({
  tableId,
  ...boxProps
}: BoxProps & { tableId: string }) => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      flexDirection="column"
      gap={2}
      {...boxProps}
    >
      <AddColumnAction tableId={tableId} />

      <TableColumnList
        key={tableId}
        tableId={tableId}
        itemActionSlot={(column) => (
          <DeleteColumnAction tableId={tableId} {...column} />
        )}
      />
    </Box>
  );
};
