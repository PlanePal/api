const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK without a configuration object
initializeApp(); // Initialize the default app

// Initialize Firestore
const db = getFirestore(); // Get the Firestore instance

module.exports = db; // Export the Firestore instance