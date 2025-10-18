import { databaseService } from "@shared/network";

export const useViewModel = () => {
  const fetchUsersOfDb = async (dbId: string) => {
    return await databaseService.fetchDbUsers(dbId);
  };

  return { fetchUsersOfDb };
};
