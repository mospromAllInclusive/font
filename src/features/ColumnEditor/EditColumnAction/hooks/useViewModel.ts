import { tableService } from "@shared/network";

export const useViewModel = () => {
  const editColumn = async (
    tableId: string,
    col: { id: string; name: string; type: string }
  ) => {
    return await tableService.editColInfo(tableId, col);
  };

  return { editColumn };
};
