import admin from "firebase-admin";
import path from "path";
const keyPath = path.join(process.cwd(), "serviceAccountKey.json");
const serviceAccount = require(keyPath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
export const db = admin.firestore();
export default admin;