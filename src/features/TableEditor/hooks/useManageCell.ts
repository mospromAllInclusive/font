import type { MouseEvent } from "react";
import type { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import { useState } from "react";

type ActiveCell = {
  rowId: string | number;
  colId: string;
  cellElement: HTMLDivElement;
};

export const useManageCell = () => {
  const [activeCell, setActiveCell] = useState<ActiveCell>();

  const handleCellSelect = (
    gridCellParams: GridCellParams,
    event: MuiEvent<MouseEvent<HTMLElement>>
  ) => {
    const cellElement = event.target as HTMLDivElement;

    setActiveCell({
      rowId: gridCellParams.id,
      colId: gridCellParams.field,
      cellElement,
    });

    cellElement.style.border = "2px solid black";

    cellElement.onblur = () => {
      console.log("blur");
    };

    console.log("gridCellParams :>> ", gridCellParams);
    console.log("event :>> ", event);
  };

  return { handleCellSelect };
};
