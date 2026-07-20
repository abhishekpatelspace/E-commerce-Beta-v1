import crypto from "crypto";

export function generateToken(payload: { id: string | any; email: string; role: string }) {
  const secret = process.env.JWT_SECRET || "craftore_default_secure_secret_token_key";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyCustomToken(token: string) {
  const secret = process.env.JWT_SECRET || "craftore_default_secure_secret_token_key";
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;
    const verifiedSignature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
    if (signature !== verifiedSignature) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedPassword: string) {
  try {
    const [salt, originalHash] = storedPassword.split(":");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === originalHash;
  } catch (e) {
    return false;
  }
}
