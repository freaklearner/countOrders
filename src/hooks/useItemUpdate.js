import {doc, addDoc, collection, deleteDoc, query, limit, where, orderBy, getDocs} from "firebase/firestore";
import {db, Timestamp} from "../configs/firebaseConfig";

const useAddData = (station, stationId, sessionId, sessionName) => {

    const addItemtoCollection = async(item, price)=>{
        const itemData = {
            "item": item,
            "station": station,
            "stationId": stationId,
            "session": sessionId,
            "sessionName": sessionName,
            "price": price,
            "time": Timestamp.now()
        }
        const docRef = await addDoc(collection(db, "solditems"), itemData);
        return docRef.id;
    }

    const deleteItemFromCollection = async (item) => {
        debugger;
        const q = query(collection(db,'solditems'),where('session','==',sessionId),where('item','==',item),orderBy('time','desc'),limit(1));
        getDocs(q)
        .then((querySnapshot) => {
            debugger;
            const id = querySnapshot.docs[0].id;
            const docRef = doc(db, "solditems", id);
            return deleteDoc(docRef);
        })
        .then((res) => {
            console.log("Document successfully deleted!", res);

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);

        })
        
    }

    return {addItemtoCollection, deleteItemFromCollection}
}
export default useAddData;