import type { GetChangeItemDTO } from "@shared/network";
import { Box, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";

export const ChangeView = ({ item }: { item: GetChangeItemDTO }) => {
  const { palette } = useTheme();

  const author = item.user;

  const formatDate = (date: string) => {
    try {
      return format(new Date(date).getTime(), "yyyy-mm-dd hh:mm:ss");
    } catch {
      return "";
    }
  };

  const getChageMessage = () => {
    const entityMatcher = {
      row: "Строка",
      column: "Колонка",
    };

    const actionMatcher = {
      add: "добавлена",
      update: "обновлена",
      delete: "удалена",
    };

    return `${entityMatcher[item.changedEntity]} ${
      actionMatcher[item.changeType]
    }`;
  };

  return (
    <Box>
      <Box>
        <Typography
          color={
            item.changeType === "delete"
              ? palette.error.dark
              : palette.success.dark
          }
        >
          {getChageMessage()}
        </Typography>

        <Typography fontSize="13px" color={palette.info.dark}>
          {author.email}
        </Typography>

        <Typography fontSize="11px" color={palette.grey[800]}>
          {formatDate(item.changedAt)}
        </Typography>
      </Box>
    </Box>
  );
};
