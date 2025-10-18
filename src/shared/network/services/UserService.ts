import { network } from "../shared/network";
import camelcaseKeys from "camelcase-keys";
import type { GetUserDTO } from "../dto/GetUserDTO";
import type { CreateUserDTO } from "../dto/CreateUserDTO";
import type { Response } from "../shared/Response";
import type { AxiosError } from "axios";

export class UserService {
  async login(payload: CreateUserDTO): Promise<Response<GetUserDTO>> {
    try {
      const { data } = await network.post<GetUserDTO>("/users/login", payload);

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async getUserInfo() {
    try {
      const { data } = await network.get<GetUserDTO["userInfo"]>("/users/info");

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }

  async registerUser(props: { email: string; name: string; password: string }) {
    try {
      const { data } = await network.post<GetUserDTO>("/users/register", props);

      return { data: camelcaseKeys(data), error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError };
    }
  }
}

export const userService = new UserService();
