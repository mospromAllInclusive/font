import { useLifecycles } from "react-use";
import { useRef } from "react";
import { SOCKET_CONNECTION_URL } from "@shared/network";
import { useGridApiRef } from "@mui/x-data-grid";

export const useWebSocket = (tableId: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  const apiGridRef = useGridApiRef();

  const handleSetCellValue = ({
    colId,
    rowId,
    value,
  }: {
    colId: string;
    rowId: string;
    value: string;
  }) => {
    const apiGrid = apiGridRef.current;
    if (!apiGrid) return;

    apiGrid.updateRows([{ id: rowId, [colId]: value }]);
  };

  const handleMessage = (e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data);

      const eventAction = data.eventAction;
      const colId = data.payload.column_id as string;
      const rowId = data.payload.row_id as string;
      const value = data.payload.value as string;

      if (eventAction === "set_cell_value") {
        handleSetCellValue({ colId, rowId, value });
      }
    } catch {
      return;
    }
  };

  const handleMount = () => {
    const ws = new WebSocket(
      `${SOCKET_CONNECTION_URL}/tables?topic=${tableId}`
    );

    ws.addEventListener("message", handleMessage);

    socketRef.current = ws;
  };

  useLifecycles(
    () => {
      handleMount();
    },
    () => {
      socketRef.current?.close();
    }
  );

  return apiGridRef;
};
