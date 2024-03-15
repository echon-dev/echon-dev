import { LocalManager } from "./LocalManager";
import { S3Manager } from "./S3Manager";
export type StorageType = 'local' | 's3' | 'cloudflare' | 'linode';

export function getStorageManager(type?: StorageType) {
  switch (type) {
    case 'local':
      return LocalManager;

    case 's3':
      return S3Manager;

    case 'cloudflare':
      return S3Manager;

    case 'linode':
      return S3Manager;

    default:
      throw new Error('[Error]: storage type must be either "local" or "s3"');
  }
}
