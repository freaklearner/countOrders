import {useContext} from "react";
import {doc, setDoc, updateDoc, addDoc, query, collection, getDocs, where} from "firebase/firestore";
import {db, Timestamp} from "../configs/firebaseConfig";
import {LoginContext} from "../context/loginContext";


const useSession = () => {
    const {station, id} = useContext(LoginContext);

    const createSession = async (sessionName) => {
        debugger;
        const session = {
            "name": sessionName,
            "StartDate": Timestamp.now(),
            "station": station,
            "user": id,
            "status": "open"
        }
        const newSession = await addDoc(collection(db, "sessions"),session);
        console.log(newSession.id);
        return newSession;
    }

    const fetchOpenSessions = async () => {
        const q = query(collection(db,'sessions'),where('status','==','open',where('user','==',id)));
        const querySnapShot = await getDocs(q);
        if(querySnapShot.empty){
            return null;
        }
        else{
            const sessions = [];
            querySnapShot.forEach(doc=>{
                sessions.push({...doc.data(),"id": doc.id});
            })
            return sessions[0];
        }
    }

    const closeSession = async (sessionId) => {
        const sessionRef = doc(db,"sessions", sessionId);
        await updateDoc(sessionRef, {
            "status": "closed",
            "EndDate": Timestamp.now()
        });
    }
    return {createSession, fetchOpenSessions, closeSession}
}

export default useSession;