import { useState, type MouseEvent } from "react";
import { TreeItem, mainVioletColor } from "@shared";
import { FaDatabase, FaTable } from "react-icons/fa6";
import { TbSql } from "react-icons/tb";
import { IoLinkSharp, IoChatbox } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import type { TreeItemProps } from "@mui/x-tree-view";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const iconMatcher = {
  database: <FaDatabase color={mainVioletColor} />,
  table: <FaTable color={mainVioletColor} />,
  query: <TbSql transform="scale(1.2)" color={mainVioletColor} />,
  link: <IoLinkSharp color={mainVioletColor} />,
  paticipant: <TbUsers color={mainVioletColor} />,
  chat: <IoChatbox color={mainVioletColor} />,
};

type DBTreeItemProps = TreeItemProps & {
  iconKey: keyof typeof iconMatcher;
  showOptions?: boolean;
  onAddEntity?: (addEventName: `${keyof typeof iconMatcher}_add`) => void;
  onDeleteEntity?: (
    deleteEventName: `${keyof typeof iconMatcher}_delete`
  ) => void;
};

export const DBTreeItem = ({
  label,
  children,
  iconKey,
  showOptions = true,
  onAddEntity,
  onDeleteEntity,
  ...props
}: DBTreeItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    onAddEntity?.(`${iconKey}_add`);
    setAnchorEl(null);
  };

  const handleDeleteEntity = () => {
    onDeleteEntity?.(`${iconKey}_delete`);
    setAnchorEl(null);
  };

  const isMenuOpened = Boolean(anchorEl);

  return (
    <TreeItem
      {...props}
      onClick={(e) => e.stopPropagation()}
      label={
        <>
          {iconMatcher[iconKey]}

          <span className="MuiTreeItem-iconContainer tree-label-title">
            {label}
          </span>

          {showOptions && (
            <IconButton
              datatype="not-expand-tree"
              className="item-option-btn"
              size="small"
              onClick={handleOpenMenu}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}

          <Menu
            open={isMenuOpened}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={handleAdd}>Добавить</MenuItem>
            <MenuItem onClick={handleDeleteEntity}>Удалить</MenuItem>
          </Menu>
        </>
      }
    >
      {children}
    </TreeItem>
  );
};
