import type { GetColumnDTO } from "./GetColumnDTO";

export type GetTableMetaDTO = {
  id: string;
  name: string;
  databaseId: number;
  columns: GetColumnDTO[];
  createdAt: string;
};
