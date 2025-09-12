import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  limit,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { app, db, auth, isFirebaseEnabled } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// --- AUTHENTICATION FUNCTIONS ---

export const apiLogin = async (email: string, password: string) => {
    if (!isFirebaseEnabled || !auth) throw new Error("Firebase is not configured.");
    return await signInWithEmailAndPassword(auth, email, password);
}

export const apiSignup = async (email: string, password: string) => {
    if (!isFirebaseEnabled || !auth) throw new Error("Firebase is not configured.");
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const apiLogout = async () => {
    if (!isFirebaseEnabled || !auth) return;
    return await signOut(auth);
}

// --- DATA FETCHING FUNCTIONS ---

// Helper function to fetch a collection and convert timestamps
async function fetchCollection(collectionName: string) {
  if (!isFirebaseEnabled || !db) return [];
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert all Firestore Timestamp objects to JS Date objects
      for (const key in data) {
        if (data[key] instanceof Timestamp) {
          data[key] = data[key].toDate().toISOString();
        }
      }
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

// Helper function to fetch a single document
async function fetchDocument(collectionName: string, docId: string) {
    if (!isFirebaseEnabled || !db) return null;
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = docSnap.data();
            for (const key in data) {
                if (data[key] instanceof Timestamp) {
                  data[key] = data[key].toDate().toISOString();
                }
            }
            return { id: docSnap.id, ...data };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching document ${collectionName}/${docId}:`, error);
        return null;
    }
}


// --- Specific Data Fetchers ---

export const getPaths = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('paths');
}

export const getLabs = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('labs');
}

export const getCtfs = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('ctfs');
}

export const getTeams = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('teams');
}

export const getLawsData = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('laws');
}
export const getCaseStudiesData = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('casestudies');
}
export const getResourcesData = async () => {
    if (!isFirebaseEnabled) return [];
    return await fetchCollection('resources');
}

export const getUserProfile = async (uid: string) => {
    if (!isFirebaseEnabled) return null;
    return await fetchDocument('users', uid);
};

export const getTeamById = async (teamId: string) => {
    if (!isFirebaseEnabled) return null;
    return await fetchDocument('teams', teamId);
}

// --- User Specific Data ---

export const getOngoingPathsForUser = async (userId: string) => {
    if (!isFirebaseEnabled) return [];

    // In a real app, you would fetch from a subcollection: /users/{userId}/ongoingPaths
    // For now, we mock some progress on a few existing paths for demonstration purposes
    const allPaths = await getPaths();
    if (!allPaths.length) return [];
    
    return allPaths.slice(0, 2).map((path: any) => ({
        ...path,
        progress: Math.floor(Math.random() * 50) + 20,
    }));
};

export const getRecentActivityForUser = async (userId: string) => {
     if (!isFirebaseEnabled) return [];
     
     // In a real app, you'd fetch from a subcollection: /users/{userId}/activity
     // For demo, we are returning some hardcoded recent activity.
     return [
        { id: '1', description: "Completed the 'Volatile Data Collection' lab.", timestamp: new Date().toISOString() },
        { id: '2', description: "Earned the 'Memory Forensics Basics' badge.", timestamp: new Date(Date.now() - 86400000).toISOString() },
     ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const getLeaderboardData = async () => {
    if (!isFirebaseEnabled || !db) return [];

    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, orderBy("rank", "asc"), limit(10));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
