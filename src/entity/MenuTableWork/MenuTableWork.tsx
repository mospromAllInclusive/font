import { Box } from "@mui/material";
import { FaDatabase } from "react-icons/fa6";
import { MdViewColumn } from "react-icons/md";
import { MenuTab } from "./ui/MenuTab";
import type { TableMenuPanel } from "@shared/model";

export type MenuTableWorkProps = {
  activeValue: TableMenuPanel;
  onSelectTab: (value: TableMenuPanel) => void;
};

export const MenuTableWork = ({
  activeValue,
  onSelectTab,
}: MenuTableWorkProps) => {
  return (
    <Box
      height="40px"
      display="flex"
      padding={0.5}
      gap="4px"
      alignContent="center"
      borderRadius="8px"
      sx={{ border: "1px solid rgb(231 228 230 / 1)" }}
    >
      <MenuTab
        active={activeValue === "records"}
        startIcon={<FaDatabase transform="scale(0.8)" />}
        onClick={() => onSelectTab("records")}
      >
        Записи
      </MenuTab>

      <MenuTab
        active={activeValue === "columns"}
        startIcon={<MdViewColumn />}
        onClick={() => onSelectTab("columns")}
      >
        Колонки
      </MenuTab>
    </Box>
  );
};
