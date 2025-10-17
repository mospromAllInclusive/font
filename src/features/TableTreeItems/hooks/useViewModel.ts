import { tableService } from "@shared/network";

export const useViewModel = () => {
  const addTable = async (dbId: string, tableName: string) => {
    return await tableService.addEmptyTableToDatabase(tableName, dbId);
  };

  return { addTable };
};
