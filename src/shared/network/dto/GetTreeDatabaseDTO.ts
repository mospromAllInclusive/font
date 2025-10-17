import type { GetTreeTableDTO } from "./GetTreeTableDTO";
import type { GetTreeQueryDTO } from "./GetTreeQueryDTO";

export type GetTreeDatabaseDTO = {
  id: string;

  name: string;

  tables: GetTreeTableDTO[];

  users: [];

  queries: GetTreeQueryDTO[];

  paticipants: [];
};
