import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import type { Readable } from 'stream';
import type { Config, StorageManager } from './types';

export class LocalManager implements StorageManager {
  private config: Config;
  constructor(config: Config) {
    this.config = config;
  }

  async read(pathname: string): Promise<Readable> {
    const file = fs.createReadStream(path.join(this.config.location, pathname));

    return file;
  }

  async write(pathname: string, data: Readable) {
    const dirname = path.dirname(path.join(this.config.location, pathname));
    await fsp.mkdir(dirname, { recursive: true });
    const file = fs.createWriteStream(path.join(this.config.location, pathname), { flags: 'w' });
    await data.pipe(file);
  }

  async delete(pathname: string) {
    fsp.rm(path.join(this.config.location, pathname));
  }

  async exists(pathname: string): Promise<boolean> {
    return await fsp.access(path.join(this.config.location, pathname))
      .then(() => true)
      .catch(() => false);
  }

  async copy(pathname: string, destPath: string) {
    const source = fs.createReadStream(path.join(this.config.location, pathname));
    const dest = fs.createWriteStream(path.join(this.config.location, destPath));

    source.pipe(dest);
  }

  async move(pathname: string, destPath: string) {
    await fsp.rename(
      path.join(this.config.location, pathname),
      path.join(this.config.location, destPath)
    );
  }

  async *list(prefix = '', maxKeys = Infinity) {
    let matchedKeys = 0;
    const absolutePrefixPath = path.resolve(this.config.location, prefix);
    const outerThis = this;

    async function* listEntries(currentPath: string): AsyncGenerator<{ Key: string; LastModified: Date; Size: number; }, void, any> {
      let entries;
      try {
        entries = await fsp.readdir(currentPath, { withFileTypes: true });
      } catch (err) {
        console.error(`Error reading directory: ${currentPath}`, err);
        return;
      }

      for (const entry of entries) {
        const entryRelativePath = path.join(currentPath, entry.name);
        const entryAbsolutePath = path.resolve(entryRelativePath);

        if (entryAbsolutePath.startsWith(absolutePrefixPath)) {
          const relativeMatchPath = path.relative(outerThis.config.location, entryAbsolutePath);
          const stat = await outerThis.getMetaData(relativeMatchPath);

          yield {
            Key: relativeMatchPath,
            LastModified: stat.lastModified,
            Size: stat.size,
          };

          if (++matchedKeys >= maxKeys) {
            break;
          }
        }

        if (entry.isDirectory() && entryAbsolutePath !== absolutePrefixPath) {
          yield* listEntries.call(outerThis, entryRelativePath);
        }
      }
    }

    yield* listEntries.call(this, this.config.location);
  }

  async getMetaData(pathname: string) {
    const stat = await fsp.stat(path.join(this.config.location, pathname));
    return {
      size: stat.size,
      fileType: undefined,
      lastModified: stat.mtime,
    };
  }
}