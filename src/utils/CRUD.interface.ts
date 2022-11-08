export interface CRUD<T> {
  findAll: () => Promise<T[] | void>;
  findById: (id: string) => Promise<T | void>;
  create: (body: any) => Promise<T | void>;
  updateById: (id: string, body: any) => Promise<T | void>;
  removeById: (id: string) => Promise<T | void>;
}
