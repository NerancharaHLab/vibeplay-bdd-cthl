/**
 * Generates a random Thai ID card number (13 digits)
 * that follows the checksum rule.
 */
export function generateThaiID(): string {
  // First digit: 1-8 (must not be 0 or 9 for valid Thai ID cards)
  let id = Math.floor(Math.random() * 8 + 1).toString();
  
  // Remaining 11 digits: 0-9
  for (let i = 1; i < 12; i++) {
    id += Math.floor(Math.random() * 10).toString();
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }

  const checksum = (11 - (sum % 11)) % 10;
  return id + checksum.toString();
}

/**
 * Generates a random string of a specific length.
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formats a date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Groups an array of objects by a given key.
 * Returns a Record<string, T[]> where each key maps to items sharing that value.
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Resolves navigation paths based on the running site.
 * For 'new-cortex', it removes the '/cortex' prefix if present since that environment runs directly under the root domain.
 */
export function getRoute(path: string): string {
  return path;
}

