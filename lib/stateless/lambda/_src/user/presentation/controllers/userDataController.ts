import { IUser } from "../../domain/entities/interfaces/user";
import { IDataSource } from "../../infrastructure/interfaces/dataSource";
import { getUser } from "../../usecase/getUser";

export const getUserController = async (
  id: string,
  dataSource: IDataSource
) => {
  try {
    const user = await getUser(id, {
      getUser: (id: string) => dataSource.getUser(id),
    });

    return user;
  } catch (err: any) {
    console.error(err);

    return err.message;
  }
};
