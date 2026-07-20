import { verifyCustomToken } from "./crypto";

export async function verifyToken(token: string) {
  const hasFirebaseCreds = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;

  if (hasFirebaseCreds) {
    try {
      const { getApps, initializeApp, cert } = await import("firebase-admin/app");
      const { getAuth } = await import("firebase-admin/auth");

      if (getApps().length === 0) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
          }),
        });
      }

      const decodedToken = await getAuth().verifyIdToken(token);
      return {
        id: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.email === "abhishekpatelspace@gmail.com" ? "admin" : "customer",
      };
    } catch (fbErr) {
      console.warn("Firebase token verification skipped/failed, falling back to custom JWT signature...");
    }
  }

  return verifyCustomToken(token);
}

export { generateToken, hashPassword, verifyPassword } from "./crypto";
