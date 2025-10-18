import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useViewModel } from "./hooks/useViewModel";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./const/columns";
import type { GetDbUserInfoDTO } from "@shared/network";
import type { GridRowsProp } from "@mui/x-data-grid";

export const PaticipantOfDB = () => {
  const { fetchUsersOfDb } = useViewModel();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const [userList, setUserList] = useState<GetDbUserInfoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUserList = async () => {
    const dbId = location.pathname.split("/").at(-1);

    if (!dbId) return;

    setIsLoading(true);
    const response = await fetchUsersOfDb(dbId);
    setIsLoading(false);

    if (response.error) {
      enqueueSnackbar("Не удалось загрузить пользователей таблицы!", {
        variant: "error",
      });
      return;
    }

    setUserList(response.data);
  };

  const gridRows: GridRowsProp = useMemo(() => {
    return userList.map((row) => {
      return { ...row };
    });
  }, [userList]);

  useEffect(() => {
    handleUpdateUserList();
  }, [location]);

  console.log("userList :>> ", userList);

  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      paddingBottom={2}
      maxHeight="100%"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Typography sx={{ marginTop: "3px" }} variant="h6">
        Участники таблицы
      </Typography>

      <Box flex="1" paddingTop={4}>
        <DataGrid loading={isLoading} columns={columns} rows={gridRows} />
      </Box>
    </Box>
  );
};
