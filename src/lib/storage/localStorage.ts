export function getLocalStorageItem(key: string): string | null {
  return globalThis.localStorage?.getItem(key) ?? null;
}

export function setLocalStorageItem(key: string, value: string): void {
  globalThis.localStorage?.setItem(key, value);
}
