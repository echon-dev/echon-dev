import * as s3 from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import type { Readable } from 'node:stream';
import type { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import type {
  StorageManager,
  Config,
} from './types';

export class S3Manager implements StorageManager {
  private client: S3Client;
  private config: Config;
  constructor(config: Config) {
    this.config = config;
    this.client = config.client as S3Client ?? this.getClient();
  }

  private getClient() {
    if (!this.config?.credentials?.clientId) {
      throw new Error("[Error]: `clientId` must be provided.");
    }

    if (!this.config?.credentials.clientToken) {
      throw new Error("[Error]: `clientToken` must be provided.");
    }

    const config: S3ClientConfig = {
      region: this.config.region,
      endpoint: this.config.endpoint,
      credentials: {
        accessKeyId: this.config.credentials.clientId,
        secretAccessKey: this.config.credentials.clientToken,
      },
    };

    return new s3.S3Client(config);
  }

  async read(pathname: string) {
    const response = await this.client.send(
      new s3.GetObjectCommand({
        Bucket: this.config.location,
        Key: pathname,
      })
    );

    return response.Body as Readable;
  }

  async write(pathname: string, data: Readable | string, contentType?: string): Promise<void> {
    const options: s3.PutObjectCommandInput = {
      Key: pathname,
      Body: data,
      Bucket: this.config.location,
    };

    if (typeof contentType !== 'undefined') {
      options.ContentType = contentType;
    }


    const uploader = new Upload({
      client: this.client,
      params: options,
    });

    await uploader.done();
  }

  async delete(pathname: string): Promise<void> {
    const deleteCommand = new s3.DeleteObjectCommand({
      Bucket: this.config.location,
      Key: pathname,
    });

    await this.client.send(deleteCommand);
  }

  async exists(pathname: string): Promise<boolean> {
    try {
      await this.getMetaData(pathname);
      return true;
    } catch (e) {
      return false;
    }
  }

  async copy(pathname: string, dest: string): Promise<void> {
    const copyCommand = new s3.CopyObjectCommand({
      Bucket: this.config.location,
      Key: dest,
      CopySource: `/${this.config.location}/${pathname}`,
    });

    await this.client.send(copyCommand);
  }

  async move(pathname: string, dest: string): Promise<void> {
    await this.copy(pathname, dest);
    await this.delete(pathname);
  }

  async getMetaData(pathname: string) {
    const stat = await this.client.send(
      new s3.HeadObjectCommand({
        Key: pathname,
        Bucket: this.config.location,
      }),
    );

    return {
      size: stat.ContentLength,
      fileType: stat.ContentType,
      lastModified: stat.LastModified,
    };
  }

  async *list<T>(prefix = '', maxItems = 10): AsyncGenerator<s3._Object> {
    let resolvedPrefix = prefix;
    if (resolvedPrefix === '.') resolvedPrefix = '';

    let continueToken: string | undefined = '';

    do {
      const options: s3.ListObjectsV2CommandInput = {
        Bucket: this.config.location,
        Prefix: prefix,
        MaxKeys: maxItems,
      };

      if (continueToken) {
        options.ContinuationToken = continueToken;
      }

      const listCommand = new s3.ListObjectsV2Command(options);

      const response = await this.client.send(listCommand);

      continueToken = response.NextContinuationToken;

      if (response.Contents) {
        for (const object of response.Contents) {
          if (!object.Key) continue;

          const isDir = object.Key.endsWith('/');

          if (isDir) continue;

          yield object;
        }
      }
    } while (continueToken);
  }

  getS3Instance() {
    return this.client;
  }
};
