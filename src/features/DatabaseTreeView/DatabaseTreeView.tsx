import { useState } from "react";
import { useLifecycles } from "react-use";
import { SimpleTreeView } from "@mui/x-tree-view";
import { DBTreeItem } from "@entity";
import { useViewModel } from "./hooks/useViewModel";
import { SuccessAddDb } from "../AddDBAction";
import { SuccessAddTable } from "../TableTreeItems";
import { TableTreeItems } from "../TableTreeItems";
import { useHistory } from "react-router-dom";
import type { GetTreeDatabaseDTO } from "@shared/network";

export const DatabaseTreeView = () => {
  const { getTree, handleAddDatabase } = useViewModel();

  const history = useHistory();

  const [tree, setTree] = useState<GetTreeDatabaseDTO[] | null>(null);

  const handleUpdateTree = async () => {
    const response = await getTree();
    setTree(response.data);
  };

  const handleSelectItem = (entityUrl: string | null) => {
    if (!entityUrl) return;

    const isTableEntity = entityUrl.startsWith("/table-item");

    if (!isTableEntity) return;

    history.push(entityUrl);
  };

  useLifecycles(
    () => {
      handleUpdateTree();
      window.addEventListener(SuccessAddDb, handleUpdateTree);
      window.addEventListener(SuccessAddTable, handleUpdateTree);
    },
    () => {
      window.removeEventListener(SuccessAddDb, handleUpdateTree);
      window.removeEventListener(SuccessAddTable, handleUpdateTree);
    }
  );

  return (
    <SimpleTreeView
      onSelectedItemsChange={(_, itemId) => {
        handleSelectItem(itemId);
      }}
    >
      {tree?.map((db) => (
        <DBTreeItem
          key={`/database/${db.id}`}
          itemId={`/database/${db.id}`}
          iconKey="database"
          label={db.name}
          onAddEntity={handleAddDatabase}
          showOptions={false}
        >
          <TableTreeItems dbId={db.id} tables={db.tables} />

          <DBTreeItem
            itemId={`/paticipant-list/${db.id}`}
            iconKey="paticipant"
            label="Участники"
          />

          <DBTreeItem itemId={`/chat/${db.id}`} iconKey="chat" label="Чат" />
        </DBTreeItem>
      ))}
    </SimpleTreeView>
  );
};
