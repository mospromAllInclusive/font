import type { GetTreeTableDTO } from "./GetTreeTableDTO";

export type GetTreeDatabaseDTO = {
  id: string;
  name: string;
  role: "admin" | "writer" | "reader";
  tables: GetTreeTableDTO[];
};
