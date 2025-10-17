import type { GetCellDTO } from "./GetCellDTO";

export type GetTableDTO = {
  id: string;

  name: string;

  columns: { name: string; type: string }[];

  rows: GetCellDTO[][];
};
