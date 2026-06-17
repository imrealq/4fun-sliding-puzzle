export function getLocalStorageItem(key: string): string | null {
  return globalThis.localStorage?.getItem(key) ?? null;
}
