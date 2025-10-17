import { tableService } from "@shared/network";
import { tableMenuActions, type TableMenuPanel } from "@shared/model";
import { useAppSelector } from "@shared/model";
import { useAppDispatch } from "@shared/model";

export const useViewModel = () => {
  const dispath = useAppDispatch();
  const activePanel = useAppSelector((state) => state.tableMenu.activePanel);

  const getTableInfo = async (tableId: string) => {
    return await tableService.getTableMeta(tableId);
  };

  const setTableMenuActivePanel = (panel: TableMenuPanel) => {
    dispath(tableMenuActions.setActivePanel(panel));
  };

  return { activePanel, getTableInfo, setTableMenuActivePanel };
};
