import { Box, type BoxProps } from "@mui/material";
import { TableEditor } from "@features";

export const TableGridEditor = (boxProps: BoxProps) => {
  return (
    <Box {...boxProps}>
      <TableEditor />
    </Box>
  );
};
