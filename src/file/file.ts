/**
 * file.ts
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */
import path from 'path';
import fs from 'fs';

/**
 * Turn the first letter capital
 */
function capitalize(value: string): string {
  const prefix = value.substr(0, 1).toUpperCase();
  const sufix = value.substr(1, value.length - 1);
  return `${prefix}${sufix}`;
}
/**
 * Represent a file and include funcionalities related to files
 */
export default class File {
  private name: string;

  private fileExtension: string;

  private fileDirPath: string;

  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath.replace('file://', '');
    const lastIndexOfDot = this.filePath.lastIndexOf('.');
    this.fileDirPath = path.dirname(this.filePath);
    if (lastIndexOfDot > 0) {
      this.fileExtension = this.filePath.substr(
        lastIndexOfDot, this.filePath.length - lastIndexOfDot,
      );
      this.name = this.filePath.replace(this.fileDirPath, '').substr(0, lastIndexOfDot - 1);
    } else {
      this.fileExtension = '';
      this.name = this.filePath.replace(this.fileDirPath, '');
    }
  }

  get simpleName(): string {
    const parts = this.name.split(path.sep);
    return parts[parts.length - 1].replace(this.extension, '');
  }

  /**
   * Return the simple name of the file withould the extension.
   *
   * @example
   * const file = new File('test.txt');
   * file.fileName; // test
   */
  get fileName(): string {
    return this.name;
  }

  get extension(): string {
    return this.fileExtension;
  }

  get dirPath(): string {
    return this.fileDirPath;
  }

  /**
   * @example
   * const file = new File('user-test.txt');
   * file.className(); // UserTest
   */
  get className(): string {
    return this.simpleName.split('-').map(capitalize).join('');
  }

  exists(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.exists(this.filePath, (data: boolean) => {
        resolve(data);
      });
    });
  }

  assertDir(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(this.dirPath, { recursive: true }, (error: Error | null) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async write(content: Buffer): Promise<void> {
    await this.assertDir();
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, content, (error: Error | null) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async touch(): Promise<void> {
    await this.assertDir();
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, Buffer.from(''), 'utf8', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static fromParts(parts: string[]): File {
    return new File(path.join(...parts));
  }
}
