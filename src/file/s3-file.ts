/**
 * s3-file.ts
 * Copyright (C) 2022 edgardleal
 *
 * Distributed under terms of the MIT license.
 */

import AWS from 'aws-sdk';
import File from './file';

/**
 * An S3 implementation of the class file
 */
export default class S3File extends File {
  private s3: AWS.S3;

  constructor(private bucket: string, private path: string) {
    super(path);
    this.s3 = new AWS.S3();
  }

  setConfig(config: AWS.S3.ClientConfiguration) {
    this.s3 = new AWS.S3(config);
  }

  async readBuffer() {
    const param: AWS.S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: this.path,
    };
    const response = await this.s3.getObject(param).promise();
    return response.Body as Buffer;
  }

  async write(content: Buffer): Promise<void> {
    const param: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: this.path,
      Body: content,
    };
    await this.s3.putObject(param).promise();
  }
}
