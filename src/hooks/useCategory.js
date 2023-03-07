import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

const useCategory = () => {

    const getCategories = async () => {
        const snapshot = await getDocs(collection(db, 'categories'));
        const categories = [];
        snapshot.forEach(doc => {
            categories.push({...doc.data(), "id": doc.id });
        }
        )
        return categories;
    }
    return { getCategories }
}

export default useCategory;