import { tableService } from "@shared/network";
import type { CreateColumnDTO } from "@shared/network";

export const useViewModel = () => {
  const handleSave = async (tableId: string, column: CreateColumnDTO) => {
    return await tableService.createColumn(tableId, column);
  };

  return { handleSave };
};
