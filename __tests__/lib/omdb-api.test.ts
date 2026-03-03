import { isValidImdbId } from '@/lib/omdb-api';

describe('isValidImdbId', () => {
  it('should return true for valid IMDb IDs', () => {
    expect(isValidImdbId('tt0133093')).toBe(true);
    expect(isValidImdbId('tt0111161')).toBe(true);
    expect(isValidImdbId('tt1234567')).toBe(true);
    expect(isValidImdbId('tt12345678')).toBe(true);
  });

  it('should return false for invalid IMDb IDs', () => {
    expect(isValidImdbId('tt123')).toBe(false); // Too short
    expect(isValidImdbId('0133093')).toBe(false); // Missing 'tt'
    expect(isValidImdbId('tt')).toBe(false); // No digits
    expect(isValidImdbId('ttabcdefg')).toBe(false); // Letters instead of digits
    expect(isValidImdbId('tt 0133093')).toBe(false); // Space
    expect(isValidImdbId('TT0133093')).toBe(false); // Uppercase
    expect(isValidImdbId('')).toBe(false); // Empty string
  });
});
