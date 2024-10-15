import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";  // Your Firebase config

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchData() {
    try {
        // Reading data from Firestore
        const dataRef = doc(db, 'stats', 'serverData'); // 'stats' is the collection and 'serverData' is the document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data(); // This will contain your serverCount and memberCount
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error reading data from Firestore:", error);
    }
}
