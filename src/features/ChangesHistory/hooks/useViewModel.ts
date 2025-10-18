import { changeLogService } from "@shared/network";

export const useViewModel = () => {
  const fetchTableHistory = async (tableId: string) => {
    return await changeLogService.getTableChanges(tableId);
  };

  return { fetchTableHistory };
};
