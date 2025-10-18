import { network } from "../shared/network";
import type { GetDbUserInfoDTO } from "../dto";
import type { Response } from "../shared/Response";
import type { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

class DatabaseService {
  async fetchDbUsers(dbId: string): Promise<Response<GetDbUserInfoDTO[]>> {
    try {
      const { data } = await network.get<GetDbUserInfoDTO[]>(
        `/databases/${dbId}/users`
      );

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const databaseService = new DatabaseService();
