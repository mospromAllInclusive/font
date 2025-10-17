import { Box, Divider } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { UserLogo } from "@entity";
import { DatabaseTreeView } from "@features";
import { AddDBAction } from "@features";
import { useViewModel } from "./hooks/useViewModel";

export const LeftSidebar = (props: BoxProps) => {
  const { userName } = useViewModel();

  return (
    <Box
      width="100%"
      height="100%"
      padding={2}
      sx={{
        backgroundColor: "rgb(244 244 245 / 1)",
        borderRight: "1px solid rgb(231 228 230 / 1)",
      }}
      {...props}
    >
      <UserLogo
        name={userName}
        src="https://v6.mui.com/static/images/avatar/1.jpg"
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <AddDBAction />

      <DatabaseTreeView />
    </Box>
  );
};
