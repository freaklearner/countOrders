import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../configs/firebaseConfig";

const useItems = () => {
    const getItems = async (station) => {
        const q = query(collection(db,'items'),where('station','==',station));
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