import { db } from './firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

exports.handler = async function(event, context) {
    try {
        // Parse incoming data from the request body
        const data = JSON.parse(event.body);

        // Reference to a Firestore document (for example, in a 'stats' collection)
        const docRef = doc(db, 'stats', 'counts');

        // Update the document with the new data
        await setDoc(docRef, {
            serverCount: data.serverCount,
            memberCount: data.memberCount,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data updated successfully' }),
        };
    } catch (error) {
        console.error('Error updating data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating data', error: error.message }),
        };
    }
};