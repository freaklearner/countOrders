import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

const useAddData = () => {

    const addItemsToDb = async (d) => {
        debugger;
        console.log(d);
        await addDoc(collection(db, "items"), d);
    }
    return {addItemsToDb}
}

export default useAddData;