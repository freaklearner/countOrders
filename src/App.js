import { useContext } from 'react';
import './App.css';
import Login from './pages/login';
import Session from './pages/session';
import { LoginContext } from './context/loginContext';


function App() {
  const {login} = useContext(LoginContext);
  return (
    <div className="App">
      {
        login?<Session user={{"station": "Test Station One"}}></Session>:<Login></Login>
      }
      {/* <Login></Login> */}
      
    </div>
  );
}

export default App;
