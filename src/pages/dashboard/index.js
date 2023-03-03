import { useEffect, useState, useContext, Fragment } from "react";
import { Typography, Button, Spin } from "antd";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

import useItems from "../../hooks/useItems";
import useAddItems from "../../hooks/useAddItems";
import { LoginContext } from "../../context/loginContext";
import "./style.css";

const Dashboard = ({ sessionId, sessionName, closeSession }) => {
  const [vegMenu, setVegMenu] = useState([]);
  const [nonVegMenu, setNonVegMenu] = useState([]);
  const [sessionObject, setSessionObject] = useState({});
  const { station, id } = useContext(LoginContext);
  const { getItems } = useItems();
  const { addItem, removeItem } = useAddItems();

  useEffect(() => {
    debugger;
    getItems().then((items) => {
      debugger;
      setVegMenu(
        items
          .filter((item) => item.category === "veg")
          .sort((a, b) => a.code - b.code)
      );
      setNonVegMenu(items.filter((item) => item.category === "non-veg"));
      //setMenu(items.sort((a,b)=>a.name.localeCompare(b.name)));
      console.log(window.screen.width);
    });
    const unSub = onSnapshot(doc(db, "sessions", sessionId + ""), (doc) => {
      setSessionObject(doc.data());
    });
    return () => unSub();
  }, []);

  const addItemsHandler = (item, id, price) => {
    debugger;
    document.getElementById(id).classList.add("disableClass");
    addItem(sessionId, item,price)
      .then((res) => {
        //document.getElementById(id).style.pointerEvents = "auto";
        document.getElementById(id).classList.remove("disableClass");
        console.log(res);
      })
      .catch((err) => {
        document.getElementById(id).classList.remove("disableClass");
        console.log(err);
      });
  };

  const removeItemsHandler = (item, id) => {
    if(sessionObject[item] && sessionObject[item] > 0){
      document.getElementById(id).classList.add("disableClass");
      removeItem(sessionId, item)
        .then((res) => {
          //document.getElementById(id).style.pointerEvents = "auto";
          document.getElementById(id).classList.remove("disableClass");
          console.log(res);
        })
        .catch((err) => {
          document.getElementById(id).classList.remove("disableClass");
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <div className="header">
        <Typography.Title className="heading" level={1}>
          {station}
        </Typography.Title>
        <Typography.Title className="subHeading" level={3}>
          {sessionName}
        </Typography.Title>
      </div>

      {vegMenu &&
        vegMenu.map((item) => {
          return (
            <div key={item.id} id={item.id} className="pill">
              <span className="pillTitle">
                {item.name}
                <span className="countText">
                  {sessionObject[item.name]
                    ? `(${sessionObject[item.name]})`
                    : "(0)"}
                </span>
              </span>
              <span>
              <Button
                onClick={(e) => removeItemsHandler(item.name, item.id)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButtonDelete"
                // type="dashed"
                icon={<MinusOutlined />}
                >
                
              </Button>
              <Button
                onClick={(e) => addItemsHandler(item.name, item.id, item.price)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButton pillVeg"
                type="primary"
                icon={<PlusOutlined/>}
                >
                
              </Button>
              </span>
            </div>
          );
        })}
      {nonVegMenu &&
        nonVegMenu.map((item) => {
          return (
            <div key={item.id} id={item.id} disable={true} className="pill">
              <span className="pillTitle">
                {item.name}
                <span className="countText">
                  {sessionObject[item.name]
                    ? `(${sessionObject[item.name]})`
                    : "(0)"}
                </span>
              </span>
              <span>
              <Button
                onClick={(e) => removeItemsHandler(item.name, item.id)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButtonDelete"
                // type="dashed"
                icon={<MinusOutlined />}
                >
              </Button>
              <Button
                onClick={(e) => addItemsHandler(item.name, item.id, item.price)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButton pillNonVeg"
                type="primary"
                icon={<PlusOutlined/>}
              >
              </Button>
              </span>
            </div>
          );
        })}

      <Button
        size={window.screen.width <= 768 ? "middle" : "large"}
        className="closeSession"
        shape="round"
        onClick={() => closeSession()}
      >
        Close Session & Logout
      </Button>

      {/* <div>
                <span>{items[0].name}</span>
                <Button type="primary" shape="round" danger>Place Order</Button>
                
            </div> */}
    </Fragment>
  );
};

export default Dashboard;
