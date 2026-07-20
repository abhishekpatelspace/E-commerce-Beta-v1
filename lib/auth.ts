import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import crypto from "crypto";

const hasFirebaseCreds = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;

if (hasFirebaseCreds && getApps().length === 0) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log("✔ Firebase Admin SDK successfully initialized in Next.js.");
  } catch (err: any) {
    console.error("✘ Failed to initialize Firebase Admin SDK in Next.js:", err.message);
  }
}

export async function verifyToken(token: string) {
  // Try Firebase verification first if initialized
  if (getApps().length > 0) {
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      return {
        id: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
      };
    } catch (fbErr) {
      console.warn("Firebase token verification failed, checking custom JWT signature...");
    }
  }

  // Custom JWT verifier
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

export function generateToken(payload: { id: string | any; email: string; role: string }) {
  const secret = process.env.JWT_SECRET || "craftore_default_secure_secret_token_key";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
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
