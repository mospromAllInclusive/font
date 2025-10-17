import { tableService } from "@shared/network";

export const useViewModel = () => {
  const getTableMetaInfo = async (tableId: string) => {
    console.log("tableId :>> ", tableId);
    return await tableService.getTableMeta(tableId);
  };

  return { getTableMetaInfo };
};
