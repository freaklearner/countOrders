import {collection, getDocs} from "firebase/firestore";
import {db} from "../configs/firebaseConfig";

const useItems = () => {
    const getItems = async () => {
        const q = collection(db,'items');
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach(doc=>{
            items.push({...doc.data(),"id": doc.id});
        })
        return items;
    }
    return {getItems}
}

export default useItems;