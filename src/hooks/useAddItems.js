import {doc, updateDoc, increment} from "firebase/firestore";
import {db} from "../configs/firebaseConfig";


const useAddItems = () => {
    const addItem = async (sessionId, val, price)=>{
        debugger;
        const d = doc(db, "sessions", sessionId+"");
        let priceVar = `${val.split(' ').join('_')}_Price`;
        // let variable = `${val.split(' ').join('_')}`;
        const updatedDoc = await  updateDoc(d,{
            [val]: increment(1),
            [priceVar]: price
        })
        return updatedDoc;
    }

    const removeItem = async(sessionId, val)=>{
        const d = doc(db, "sessions", sessionId+"");
        const updatedDoc = await updateDoc(d,{
            [val]: increment(-1)
        })
        return updatedDoc;
    }


    return{addItem, removeItem}
}

export default useAddItems;