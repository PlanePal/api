const db = require('./firebaseConfig'); // Import the Firestore instance

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
        const data = JSON.parse(event.body);

        if (!data.serverCount || !data.memberCount) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Missing data" }),
            };
        }

        await db.collection('data').doc('counts').set({
            serverCount: data.serverCount,
            memberCount: data.memberCount,
        });

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