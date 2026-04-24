import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// You MUST use the firestoreDatabaseId from the firebase-applet-config.json file
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    const message = error.message || String(error);
    const code = error.code;
    
    if (
      message.includes('the client is offline') || 
      message.includes('permission-denied') || 
      message.includes('Missing or insufficient permissions') ||
      code === 'permission-denied'
    ) {
      // Permission denied confirms we reached the server and it evaluated our rules
      console.log("Firebase connection established.");
    } else {
      console.error("Firebase connection error:", error);
    }
  }
}

testConnection();

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

export function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const currentUser = auth.currentUser;
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || String(error),
    operationType,
    path,
    authInfo: {
      userId: currentUser?.uid || 'unauthenticated',
      email: currentUser?.email || 'none',
      emailVerified: currentUser?.emailVerified || false,
      isAnonymous: currentUser?.isAnonymous || false,
      providerInfo: currentUser?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || 'none',
        email: p.email || 'none'
      })) || []
    }
  };
  throw new Error(JSON.stringify(errorInfo));
}
