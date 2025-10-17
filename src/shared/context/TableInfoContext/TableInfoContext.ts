import { createContext, useContext } from "react";
import type { GetTableDTO } from "../../network/dto/GetTableDTO";

const TableInfoContext = createContext<GetTableDTO | null>(null);

export const TableInfoProvider = TableInfoContext.Provider;

export const useTableInfoContext = () => {
  const context = useContext(TableInfoContext);

  if (!context) throw new Error("Missed TableInfoContext!");

  return context;
};
