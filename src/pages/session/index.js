import { Fragment, useRef, useState, useEffect } from "react";
import { Typography, Input, Button } from "antd";
import "./style.css";
import Dashboard from "../dashboard";
import useSession from "../../hooks/useSession";
import useLogin from "../../hooks/useLogin";

const Session = ({ user }) => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionName, setSessionName] = useState(null);
  const { createSession, fetchOpenSessions, closeSession } = useSession();
  const {logouthandler} = useLogin();
  const sessionRef = useRef(null);

  useEffect(() => {
    fetchOpenSessions()
    .then((openSessions)=>{
        debugger;
        if (openSessions) {
            debugger;
            setSessionId(openSessions.id);
            setSessionName(openSessions.name);
        }
        else{
            debugger;
            let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
            let today = new Date();
          sessionRef.current.input.value=daylist[today.getDay()].toUpperCase();
        }
    })
    .catch((err)=>{
        console.log(err);
    })

    

  }, []);

  const createSessionHandler = async () => {
    debugger;
    console.log(sessionRef.current.input.value);
    const session = await createSession(sessionRef.current.input.value);
    debugger;
    setSessionId(session.id);
    setSessionName(sessionRef.current.input.value);
  };

  const closeSessionHandler = async () => {
    debugger;
    await closeSession(sessionId);
    setSessionId(null);
    setSessionName(null);
    logouthandler(); 
  }



  let createSessionComponent = (
    <div className="sessionRoot">
      <Typography.Title className="sessionTitle" level={1}>
        {user.station}
      </Typography.Title>
      <Input
        ref={sessionRef}
        className="sessionInput"
        type="text"
        placeholder="Enter Session name"
      />
      <Button
        className="sessionButton"
        shape="round"
        onClick={createSessionHandler}
      >
        Create Session
      </Button>
    </div>
  )

  return (
    <Fragment>
        {
            sessionId?(<Dashboard sessionId={sessionId} sessionName={sessionName} closeSession={closeSessionHandler}/>):(createSessionComponent)
        }
    </Fragment>
    
  );
};

export default Session;
