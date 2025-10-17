import { tableService } from "@shared/network";

export const useViewModel = () => {
  const fetchColumns = async (tableId: string) => {
    return await tableService.getTableColumns(tableId);
  };

  return { fetchColumns };
};
