import { describe, it, expect } from '@jest/globals';
import { expandIPv6 } from '../../src/utils/expandIPv6';

describe('expandIPv6', () => {
  it.each([
    { ip: 'fe80:685::ff:fe72:c4fa', expected: 'fe80:0685:0000:0000:0000:00ff:fe72:c4fa' },
    { ip: '::', expected: '0000:0000:0000:0000:0000:0000:0000:0000' },
    { ip: '::1', expected: '0000:0000:0000:0000:0000:0000:0000:0001' },
  ])('should expand ipv6 properly for $ip', ({ ip, expected }) => {
      expect(expandIPv6(ip)).toBe(expected);
    });
});
