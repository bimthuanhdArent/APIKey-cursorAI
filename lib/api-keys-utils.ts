/** Generate a new API key string (client-side only; store in DB via createApiKey). */
export function generateApiKey(): string {
  const prefix = "dandi_";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + result;
}

/** Mask key for display (show prefix + asterisks). */
export function maskKey(key: string, type: string): string {
  const prefix = `dandi-${type}-`;
  return prefix + "*".repeat(13);
}
