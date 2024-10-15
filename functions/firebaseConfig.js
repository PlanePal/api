const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Use your service account key for authentication
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id, // Use project ID from service account
});

// Initialize Firestore
const db = getFirestore();

// Export Firestore instance
module.exports = db;
