import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";  // If this is where your firebase config is stored

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function updateData(data) {
    try {
        // Writing data to Firestore
        const dataRef = doc(db, 'stats', 'serverData'); // 'stats' is the collection and 'serverData' is the document
        await setDoc(dataRef, {
            serverCount: data.serverCount,
            memberCount: data.memberCount
        });

        console.log("Data successfully written to Firestore!");
    } catch (error) {
        console.error("Error writing data to Firestore:", error);
    }
}
