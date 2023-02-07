export interface IUserRepository<T> {
  getUser: (id: string) => Promise<T | undefined>;
}
