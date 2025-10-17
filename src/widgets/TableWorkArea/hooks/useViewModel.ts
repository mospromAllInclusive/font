import { tableService } from "@shared/network";
import { tableMenuActions, type TableMenuPanel } from "@shared/model";
import { useAppSelector } from "@shared/model";
import { useAppDispatch } from "@shared/model";

export const useViewModel = () => {
  const dispath = useAppDispatch();
  const activePanel = useAppSelector((state) => state.tableMenu.activePanel);

  const getTable = async (tableId: string) => {
    return await tableService.getTable(tableId);
  };

  const setTableMenuActivePanel = (panel: TableMenuPanel) => {
    dispath(tableMenuActions.setActivePanel(panel));
  };

  return { activePanel, getTable, setTableMenuActivePanel };
};
