import {createContext, useEffect, useReducer} from 'react';

const LoginContext = createContext();

const actionReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.payload,
                login: true
            };
        case 'LOGOUT':
            return {
                login: false
            };
        default:
            return state;
    }
}



const LoginProvider = ({children}) => {
    const [login, setLogin] = useReducer(actionReducer, {login: false});

    useEffect(() => {
        const data = localStorage.getItem('login');
        if (data) {
            setLogin({type: 'LOGIN', payload: JSON.parse(data)});
        }
    },[])
    
    return (
        <LoginContext.Provider value={{...login,setLogin}}>
        {children}
        </LoginContext.Provider>
    );

}

export {LoginContext, LoginProvider};
