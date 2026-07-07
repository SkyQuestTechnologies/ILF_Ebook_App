// lib/password.ts
// Edge-safe password hashing using PBKDF2 via SubtleCrypto.
// No Node APIs. Format stored as "salt_b64:hash_b64".

const ITERATIONS = 100_000;
const KEY_LEN = 32; // bytes

function toB64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function fromB64(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function derive(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  // Copy salt into a fresh ArrayBuffer-backed view so it satisfies BufferSource.
  const saltBuf = new Uint8Array(salt.length);
  saltBuf.set(salt);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBuf, iterations: ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    KEY_LEN * 8
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt);
  return `${toB64(salt)}:${toB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltB64, hashB64] = stored.split(":");
  if (!saltB64 || !hashB64) return false;
  const salt = fromB64(saltB64);
  const expected = fromB64(hashB64);
  const actual = await derive(password, salt);
  if (actual.length !== expected.length) return false;
  // constant-time compare
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}
