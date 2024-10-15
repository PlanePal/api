const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firestore
const db = getFirestore();

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', // Replace with your domain if needed
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    try {
        // Fetch document from Firestore
        const doc = await db.collection('data').doc('counts').get();

        if (!doc.exists) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ message: "No data found" }),
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(doc.data()),
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Error fetching data", error: error.message }),
        };
    }
};