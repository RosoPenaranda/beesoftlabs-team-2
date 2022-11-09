export interface CRUD<T> {
  create: (body: any, user: any) => Promise<T | void>;
  findAll: () => Promise<T[] | void>;
  findById: (id: string) => Promise<T | void>;
  updateById: (id: string, body: any) => Promise<T | void>;
  removeById: (id: string) => Promise<T | void>;
}
