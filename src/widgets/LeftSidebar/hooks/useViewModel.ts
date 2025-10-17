import { useAppSelector } from "@shared/model";

export const useViewModel = () => {
  const userName = useAppSelector((state) => state.userInfo.user?.name || "");

  return { userName };
};
