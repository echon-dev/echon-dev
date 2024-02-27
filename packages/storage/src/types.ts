export type Config = {
  endpoint?: string;
  credentials?: {
    clientId?: string;
    clientToken?: string;
  },
  location: string;
  region?: string;
  client?: unknown;
};

export declare class StorageManager {
  constructor(config: Config);

  read(pathname: string): Promise<unknown>;

  write(pathname: string, data: unknown): Promise<unknown>;

  delete(pathname: string): Promise<unknown>;

  exists(pathname: string): Promise<boolean>;

  copy(pathname: string, dest: string): Promise<unknown>;

  move(pathname: string, dest: string): Promise<unknown>;

  getMetaData(pathname: string): Promise<unknown>;
}