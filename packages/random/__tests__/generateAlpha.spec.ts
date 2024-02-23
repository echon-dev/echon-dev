import {
  describe,
  it,
  expect,
} from '@jest/globals';
import { alpha, lowerAlpha, upperAlpha } from '../src/constants'
import {
  generateAlpha,
  generateLowerAlpha,
  generateUpperAlpha,
} from '../src/generateAlpha';

describe('generate alpha characters', () => {
  describe('generateAlpha', () => {
    it('should generate random string with default length and character set', () => {
      const result = generateAlpha();
      expect(result.length).toBe(10);
      expect(result).toMatch(/^[a-zA-Z]{10}$/);
    });

    it('should generate random string with length and character set', () => {
      const length = 100;
      const characterSet = alpha;
      const result = generateAlpha(length);
      expect(result.length).toBe(length);
      expect(result).toMatch(new RegExp(`^[${characterSet}]{${length}}$`));
    });
  });

  describe('generateLowerAlpha', () => {
    it('should generate random string with default length and character set', () => {
      const result = generateLowerAlpha();
      expect(result.length).toBe(10);
      expect(result).toMatch(/^[a-z]{10}$/);
    });

    it('should generate random string with length and character set', () => {
      const length = 100;
      const characterSet = lowerAlpha;
      const result = generateLowerAlpha(length);
      expect(result.length).toBe(length);
      expect(result).toMatch(new RegExp(`^[${characterSet}]{${length}}$`));
    });
  });

  describe('generateUpperAlpha', () => {
    it('should generate random string with default length and character set', () => {
      const result = generateUpperAlpha();
      expect(result.length).toBe(10);
      expect(result).toMatch(/^[A-Z]{10}$/);
    });

    it('should generate random string with length and character set', () => {
      const length = 100;
      const characterSet = upperAlpha;
      const result = generateUpperAlpha(length);
      expect(result.length).toBe(length);
      expect(result).toMatch(new RegExp(`^[${characterSet}]{${length}}$`));
    });
  });
});
