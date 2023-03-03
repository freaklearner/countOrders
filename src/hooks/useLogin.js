import { useContext } from "react";
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { LoginContext } from "../context/loginContext";
import {db} from "../configs/firebaseConfig";

const useLogin = () => {
    const {setLogin} = useContext(LoginContext);

    const loginhandler = async (code, password)=>{
        debugger
        const q = query(collection(db,'login'), where('Code', '==', code));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc=>{
            if(doc.data().Password===password){
                setLogin({type: 'LOGIN', payload: {...doc.data(),"id": doc.id}});
                debugger;
                localStorage.setItem('login', JSON.stringify({...doc.data(),"id": doc.id}));
            }
        })
    }

    const logouthandler = () => {
        setLogin({type: 'LOGOUT'});
        localStorage.removeItem('login');
    }

    return {loginhandler, logouthandler}
}

export default useLogin;

