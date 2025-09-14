
/* eslint-disable @typescript-eslint/no-var-requires */
const { initializeApp, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// This script uses Application Default Credentials (ADC).
// Before running, ensure you have set the GOOGLE_APPLICATION_CREDENTIALS
// environment variable to the path of your service account key file.

let app;

try {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.');
  }
  
  if (getApps().length === 0) {
    app = initializeApp();
  } else {
    app = getApps()[0];
  }
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization failed.');
  console.error(`Error: ${error.message}`);
  console.error('Please ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable points to a valid service account key file.');
  process.exit(1);
}

const auth = getAuth(app);
const db = getFirestore(app);

async function checkFirebaseServices() {
  console.log('\n--- Checking Firebase Services Status ---');

  // 1. Check Firebase Authentication
  try {
    // Listing 1 user is a lightweight way to check if the service is enabled.
    await auth.listUsers(1);
    console.log('✅ Firebase Authentication: Enabled and accessible.');
  } catch (error) {
    if (error.code === 'auth/project-not-found' || error.message.includes('IAM permission')) {
        console.error('❌ Firebase Authentication: PROJECT NOT FOUND or PERMISSION DENIED.');
        console.error('   Please check if the project ID in your service account key is correct and that the account has sufficient permissions.');
    } else if (error.code === 'auth/user-not-found') {
        // This can happen on a brand new project with no users, which is a success case.
        console.log('✅ Firebase Authentication: Enabled and accessible (No users found).');
    } 
    else {
        console.error('❌ Firebase Authentication: FAILED.');
        console.error(`   Error Code: ${error.code}`);
        console.error(`   Error Message: ${error.message}`);
    }
  }

  // 2. Check Firestore Database
  try {
    // Listing collections is a standard way to check if Firestore is active.
    await db.listCollections();
    console.log('✅ Firestore Database: Enabled and accessible.');
  } catch (error) {
     if (error.code === 5 && error.message.includes('Cloud Firestore API has not been used')) {
         console.error('❌ Firestore Database: API NOT ENABLED.');
         console.error('   Please go to the Firebase Console, navigate to the Firestore Database section, and enable it.');
     } else if (error.code === 7) {
        console.error('❌ Firestore Database: PERMISSION DENIED.');
        console.error('   The service account does not have permissions to access Firestore. Please check IAM roles.');
     } else {
        console.error('❌ Firestore Database: FAILED.');
        console.error(`   Error Code: ${error.code}`);
        console.error(`   Error Message: ${error.message}`);
     }
  }

  console.log('\n--- Check complete ---');
}

checkFirebaseServices();
