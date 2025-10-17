import { useState, type ChangeEvent } from "react";
import type { GetTreeTableDTO } from "@shared/network";
import {
  DBTreeItem,
  CreateTableButton,
  type CrateTableButtonProps,
} from "@entity";
import { TreeItem } from "@shared";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import { useViewModel } from "./hooks/useViewModel";
import { SuccessAddTable } from "./events/SuccessAddTable";

type TableTreeItemsProps = {
  dbId: string;
  tables: GetTreeTableDTO[];
};

type CreationMethod = CrateTableButtonProps["view"];

export const TableTreeItems = ({ dbId, tables }: TableTreeItemsProps) => {
  const { addTable } = useViewModel();

  const [openDialog, setOpenDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [tableName, setTableName] = useState("");
  const [creationMethod, setCreationMethod] = useState<CreationMethod | null>(
    null
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTableName("");
    setCreationMethod(null);
  };

  const handleSelectCreationMethod = (method: CreationMethod) => {
    setCreationMethod(method);
  };

  const handleUpdateTableName = (e: ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const handleCreateTable = async () => {
    setIsCreating(true);

    const response = await addTable(dbId, tableName);

    if (response.error) {
      setIsCreating(false);
      return;
    }

    setIsCreating(false);

    window.dispatchEvent(new Event(SuccessAddTable));

    handleCloseDialog();
  };

  const isValid = () => {
    if (!tableName) return false;
    if (!creationMethod) return false;
    return true;
  };

  return (
    <>
      <DBTreeItem
        itemId={`/table-list/${dbId}`}
        iconKey="table"
        label="Таблицы"
        onAddEntity={handleOpenDialog}
      >
        {tables.map((table) => (
          <TreeItem
            key={`/table-item/${table.id}`}
            itemId={`/table-item/${table.id}`}
            label={table.name}
          />
        ))}
      </DBTreeItem>

      <Dialog
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        open={openDialog}
      >
        <DialogTitle>Новая таблица</DialogTitle>

        <DialogContent>
          <TextField
            onChange={handleUpdateTableName}
            fullWidth
            sx={{ mt: 1 }}
            label="Имя таблицы"
          />

          <Box mt={2} gap={2} display="flex" justifyContent="space-between">
            <CreateTableButton
              view="google-sheets"
              selected={creationMethod === "google-sheets"}
              onClick={() => handleSelectCreationMethod("google-sheets")}
            />

            <CreateTableButton
              view="template-table"
              selected={creationMethod === "template-table"}
              onClick={() => handleSelectCreationMethod("template-table")}
            />

            <CreateTableButton
              view="excel-csv"
              selected={creationMethod === "excel-csv"}
              onClick={() => handleSelectCreationMethod("excel-csv")}
            />

            <CreateTableButton
              view="blank-table"
              selected={creationMethod === "blank-table"}
              onClick={() => handleSelectCreationMethod("blank-table")}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>

          <Button
            loading={isCreating}
            type="submit"
            variant="contained"
            form="subscription-form"
            onClick={handleCreateTable}
            disabled={!isValid()}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
