import { useState } from "react";

export type PaginationMeta = {
  page: number;
  pageSize: number;
};

export const useNavigationMeta = () => {
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    pageSize: 100,
  });

  return { paginationMeta, setPaginationMeta };
};
