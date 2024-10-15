const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
const firebaseConfig = {
    // Use environment variables for sensitive information
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
const db = getFirestore();

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*', // Change '*' to your specific origin if necessary
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    try {
        // Parse the JSON body
        const data = JSON.parse(event.body);

        // Ensure data is present
        if (!data.serverCount || !data.memberCount) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Missing data" }),
            };
        }

        // Update Firestore with the data
        await db.collection('your-collection-name').doc('your-doc-id').set({
            serverCount: data.serverCount,
            memberCount: data.memberCount,
        });

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Data updated successfully" }),
        };
    } catch (error) {
        console.error('Error updating data:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Error updating data", error: error.message }),
        };
    }
};