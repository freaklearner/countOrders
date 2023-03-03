import {doc, updateDoc, increment} from "firebase/firestore";
import {db} from "../configs/firebaseConfig";


const useAddItems = () => {
    const addItem = async (sessionId, val)=>{
        const d = doc(db, "sessions", sessionId+"");
        const updatedDoc = await  updateDoc(d,{
            [val]: increment(1)
        })
        return updatedDoc;
    }

    const removeItem = async(sessionId, val)=>{
        const d = doc(db, "sessions", sessionId+"");
        const updatedDoc = await updateDoc(doc,{
            [val]: increment(-1)
        })
        return updatedDoc;
    }


    return{addItem, removeItem}
}

export default useAddItems;