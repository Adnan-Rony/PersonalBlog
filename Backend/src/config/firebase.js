
import admin from 'firebase-admin';
import serviceAccount from '../config/firebaseServiceAccountKey.json' assert { type: 'json' };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
