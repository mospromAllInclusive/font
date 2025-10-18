import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useViewModel } from "./hooks/useViewModel";
import EditIcon from "@mui/icons-material/Edit";
import { useBoolean } from "react-use";
import type { GetColumnDTO } from "@shared/network";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { SuccessEditColumn } from "./event/SuccessEditColumn";

export const EditColumnAction = ({
  id: colId,
  name,
  type,
  tableId,
}: GetColumnDTO & { tableId: string }) => {
  const { editColumn } = useViewModel();
  const { enqueueSnackbar } = useSnackbar();

  const [showDialog, setShowDialog] = useBoolean(false);
  const [isUpdating, setIsUpdating] = useBoolean(false);

  const [values, setValues] = useState({
    name: name || "",
    type: type || "string",
  });

  const handleEditColName = (colName: string) => {
    setValues({ ...values, name: colName });
  };

  const handleUpdateColType = (colType: GetColumnDTO["type"]) => {
    setValues({ ...values, type: colType });
  };

  const handleOpenDialog = () => {
    setShowDialog();
  };

  const handleSaveColumn = async () => {
    setIsUpdating(true);

    const response = await editColumn(tableId, {
      id: colId,
      name: values.name,
      type: values.type,
    });

    setIsUpdating(false);

    if (response.error) {
      enqueueSnackbar("Не удалось обновить колонку!", { variant: "error" });
      return;
    }

    enqueueSnackbar("Колонка успешно обновлена!", { variant: "success" });

    window.dispatchEvent(new Event(SuccessEditColumn));

    setShowDialog(false);
  };

  const isValid = () => {
    return values.name.trim() && values.type.trim();
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>

      <Dialog fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Изменение колонки</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            pt={1}
            gap={2}
            display="flex"
            flexDirection="column"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveColumn();
            }}
          >
            <TextField
              label="Имя колонки"
              size="small"
              value={values.name}
              onChange={(e) => handleEditColName(e.target.value)}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Тип колонки</InputLabel>
              <Select
                value={values.type}
                onChange={(e) => handleUpdateColType(e.target.value)}
                label="Тип колонки"
              >
                <MenuItem value="text">Текст</MenuItem>
                <MenuItem value="numeric">Число</MenuItem>
                <MenuItem value="enum">Выбор из предложенных</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" gap={1} justifyContent="end">
              <Button loading={isUpdating}>Закрыть</Button>

              <Button
                loading={isUpdating}
                disabled={!isValid()}
                type="submit"
                variant="contained"
                onClick={handleSaveColumn}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
