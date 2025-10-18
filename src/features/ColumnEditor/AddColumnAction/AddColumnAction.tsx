import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  type ButtonProps,
} from "@mui/material";
import { SuccessAddColumn } from "./events/SuccessAddColumn";
import { useSnackbar } from "notistack";
import { useViewModel } from "./hooks/useViewModel";
import AddIcon from "@mui/icons-material/Add";

type ColumnValues = {
  type: string;
  name: string;
};

type AddColumnAction = {
  tableId: string;
};

export const AddColumnAction = ({
  tableId,
  ...buttonProps
}: AddColumnAction & ButtonProps) => {
  const { handleSave } = useViewModel();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [colData, setColData] = useState<ColumnValues>({
    type: "",
    name: "",
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setColData({ type: "", name: "" });
  };

  const handleUpdateColType = (colType: string) => {
    setColData({ ...colData, type: colType });
  };

  const handleUpdateName = (colName: string) => {
    setColData({ ...colData, name: colName });
  };

  const isValid = (
    colData: ColumnValues
  ): colData is { name: string; type: string } => {
    return Boolean(colData.name.trim()) && Boolean(colData.type);
  };

  const handleCreate = async () => {
    if (!isValid(colData)) {
      enqueueSnackbar("Заполните имя колонки и её тип!", { variant: "error" });
      return;
    }

    const response = await handleSave(tableId, {
      ...colData,
      name: colData.name.trim(),
    });

    if (response.error) {
      enqueueSnackbar("Не удалось создать колонку! Попробуйте позже.", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Колонка успешно создана!", {
      variant: "success",
    });

    window.dispatchEvent(new Event(SuccessAddColumn));

    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ borderRadius: "8px" }}
        onClick={handleOpenDialog}
        {...buttonProps}
      >
        Добавить колонку
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Новая колонка</DialogTitle>

        <DialogContent>
          <Box
            onSubmit={(e) => e.preventDefault()}
            component="form"
            paddingTop={1}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Тип колонки</InputLabel>
              <Select
                value={colData.type}
                onChange={(e) => handleUpdateColType(e.target.value)}
                label="Тип колонки"
              >
                <MenuItem value="text">Текст</MenuItem>
                <MenuItem value="numeric">Число</MenuItem>
                <MenuItem value="enum">Выбор из предложенных</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={colData.name}
              onChange={(e) => handleUpdateName(e.target.value)}
              size="small"
              fullWidth
              label="Имя колонки"
            />

            <Box display="flex" justifyContent="end">
              <Button onClick={handleClose}>Закрыть</Button>
              <Button
                disabled={!isValid(colData)}
                type="submit"
                onClick={handleCreate}
                variant="contained"
              >
                Создать
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
