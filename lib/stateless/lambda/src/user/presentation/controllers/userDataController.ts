import { IUser } from "../../domain/entities/interfaces/user";
import { getUser } from "../../usecase/getUser";

interface DataSource {
  getUser: (id: string) => Promise<IUser | undefined>;
}

export const getUserController = async (id: string, dataSource: DataSource) => {
  try {
    const user = await getUser(id, {
      getUser: (id: string) => dataSource.getUser(id),
    });

    return user;
  } catch (err) {
    console.error(err);

    throw err;
  }
};
