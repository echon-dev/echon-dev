import {
  describe,
  it,
  expect,
} from '@jest/globals';
import { escape } from 'node:querystring';
import { generateRandomString } from '../src/generateRandomString';

describe('generateRandomString', () => {
  it('should generate random string with length and character set', () => {
    const length = 10;
    const characterSet = escape('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?');
    const result = generateRandomString(length, characterSet);
    expect(result.length).toBe(length);
    expect(result).toMatch(new RegExp(`^[${characterSet}]{${length}}$`));
  });
});
