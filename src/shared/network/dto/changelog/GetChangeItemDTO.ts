type ChangeColumnItem = {
  name: string;
  type: string;
  id: string;
  enum: null | string[];
};

type ChangeRowItem = {
  ColumnID: string;
  ColumnName: string;
  Value: string;
};

export type GetChangeItemDTO = {
  changeId: number;
  changedEntity: "row" | "column";
  changeType: "add" | "delete" | "update";
  beforeColumn: null | ChangeColumnItem;
  afterColumn: null | ChangeColumnItem;
  beforeRow: null | ChangeRowItem[];
  afterRow: null | ChangeRowItem[];
  changedAt: string;
  user: {
    id: 1;
    name: string;
    email: string;
    createdAt: string;
  };
};
