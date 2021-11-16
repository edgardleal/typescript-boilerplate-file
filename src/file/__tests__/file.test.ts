/**
 * file.test.ts
 *
 * @module file.test.ts
 */
import File from '../file';

describe('file', () => {
  describe('extension', () => {
    it('extension value should be txt', () => {
      const file = new File('./folder/file.txt');
      const result = file.extension;
      expect(result).toBe('.txt');
    });
    it('a file withould a file extension, should return an empty string', () => {
      const result = new File('./test').extension;
      expect(result).toBe('');
    });
  });

  describe('dirName', () => {
    it('for ./folder/test.txt, should return ./folder', () => {
      const result = new File('./folder/test.txt').dirPath;
      expect(result).toBe('./folder');
    });
    it('for file://./folder/test.txt, should return ./folder', () => {
      const result = new File('file://./folder/test.txt').dirPath;
      expect(result).toBe('./folder');
    });
  });
  describe('simpleName', () => {
    it('for ./create-user.txt should return, create-user', () => {
      const result = new File('./create-user.txt').simpleName;
      expect(result).toBe('create-user');
    });
  });
  describe('className', () => {
    it('for create-file.txt should return CreateFile', () => {
      const result = new File('./create-file.txt').className;
      expect(result).toBe('CreateFile');
    });
  });
});
