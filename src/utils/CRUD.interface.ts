export interface CRUD<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (body: any) => Promise<T>;
  updateById: (id: string, body: any) => Promise<T>;
  deleteById: (id: string) => Promise<T>;
}
