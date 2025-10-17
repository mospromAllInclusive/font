import { network } from "../shared/network";
import type { Response } from "../shared/Response";
import type { GetTreeDatabaseDTO } from "../dto";
import type { AxiosError } from "axios";

class TreeDatabaseService {
  async getTree(): Promise<Response<GetTreeDatabaseDTO[]>> {
    try {
      const { data } = await network.get("/database/list");
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async addDatabase(dbName: string): Promise<Response<GetTreeDatabaseDTO[]>> {
    try {
      const { data } = await network.post("/database/create", { dbName });
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  // async addEmptyTableToDatabase(dbId: string, tableName: string) {
  //   try {
  //     const { data } = await network.post(`/database/${dbId}/table`, {
  //       tableName,
  //     });

  //     return { data, error: null };
  //   } catch (error) {
  //     return { data: null, error: error as AxiosError };
  //   }
  // }
}

export const treeDatabaseService = new TreeDatabaseService();
