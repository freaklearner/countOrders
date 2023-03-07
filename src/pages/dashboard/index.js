import { useEffect, useState, useContext, Fragment } from "react";
import { Typography, Button, Spin } from "antd";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

import useItems from "../../hooks/useItems";
import useAddItems from "../../hooks/useAddItems";
import useCategory from "../../hooks/useCategory";
import { LoginContext } from "../../context/loginContext";
import addItemsToDb from '../updateDb/index';
import "./style.css";
import data from "../../data/items";

const Dashboard = ({ sessionId, sessionName, closeSession }) => {
  const [sessionObject, setSessionObject] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [Items, setItems] = useState([]);
  const [vegMenu, setVegMenu] = useState([]);
  const [nonVegMenu, setNonVegMenu] = useState([]);

  const { station, id } = useContext(LoginContext);
  const { getItems } = useItems();
  const { getCategories } = useCategory();
  const { addItem, removeItem } = useAddItems();
  const {dataAdd} = addItemsToDb();

  
  

  useEffect(() => {  
    //dataAdd();
    getCategories().then((categories) => {
      setCategories(categories);
      
      return getItems(station);
    })
    .then((items) => {
      debugger;
      setItems(items);
      const filteredItems = items.filter((item) => item.type === selectedCategory);
      
      setVegMenu(
        filteredItems
          .filter((item) => item.type === "veg")
          .sort((a, b) => a.code - b.code)
      );
      let data = filteredItems.filter((item) => item.type === "non-veg");
      data= data.sort((a,b)=>a.code-b.code);
      setNonVegMenu(data);
      //setNonVegMenu(filteredItems.filter((item) => item.type === "non-veg").sort((a, b) => a.code - b.code));
      //setMenu(items.sort((a,b)=>a.name.localeCompare(b.name)));

      console.log(window.screen.width);
    });
    

    const unSub = onSnapshot(doc(db, "sessions", sessionId + ""), (doc) => {
      setSessionObject(doc.data());
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    debugger;
    const filteredItems = Items.filter((item) => item.category === selectedCategory);
    let data = filteredItems.filter((item) => item.type === "non-veg");
      data= data.sort((a,b)=>a.code-b.code);
    setVegMenu(
      filteredItems
        .filter((item) => item.type === "veg")
        .sort((a, b) => a.code - b.code)
    );
    setNonVegMenu(data);
  },[selectedCategory]);

  const selectCategoryHandler = (category) => {
    setSelectedCategory(category);
    
  }

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

  const types = ["STEAM", "FRIED","TANDOOR"];

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

       <div className="typeList">
        {categories && categories.map((type,index) => {
          let cl="list";
          if(selectedCategory==type.alias){
            cl="list listSelected"
          }
          return (
            <span onClick={()=>selectCategoryHandler(type.alias)} key={type.alias} className={cl}>
              {type.alias.toUpperCase()}
            </span>
          );
        })}
      </div>
      

      {vegMenu &&
        vegMenu.map((item) => {
          return (
            <div key={item.id} id={item.id} className="pill">
              <span className="pillTitle">
                {item.name}
                <span className="countText">
                  {sessionObject[item.alias]
                    ? `(${sessionObject[item.alias]})`
                    : "(0)"}
                </span>
              </span>
              <span>
              <Button
                onClick={(e) => removeItemsHandler(item.alias, item.id)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButtonDelete"
                // type="dashed"
                icon={<MinusOutlined />}
                >
                
              </Button>
              <Button
                onClick={(e) => addItemsHandler(item.alias, item.id, item.price)}
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
                  {sessionObject[item.alias]
                    ? `(${sessionObject[item.alias]})`
                    : "(0)"}
                </span>
              </span>
              <span>
              <Button
                onClick={(e) => removeItemsHandler(item.alias, item.id)}
                size={window.screen.width <= 768 ? "middle" : "large"}
                className="pillButtonDelete"
                // type="dashed"
                icon={<MinusOutlined />}
                >
              </Button>
              <Button
                onClick={(e) => addItemsHandler(item.alias, item.id, item.price)}
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
