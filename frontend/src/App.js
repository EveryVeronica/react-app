import React, { useEffect, useReducer, useRef, useState } from "react";
import './App.css';
import axios from "axios";
import HandleButton from './components/HandleButton';
import LoginFormEmail from './components/LoginFormEmail';
import UserArea from './components/UserArea';
import InformationDisplayArea from './components/InformationDisplayArea';









function reducer(state, action) {
  if (action.type === "login") {
    return action.payload;
  }

  if (action.type === "logout") {
    return null;
  }
  return state;
}

function inspection(state, action) {
  if (action.type === "import") {
    return action.payload;
  }

  if (action.type === "export") {
    return null;
  }
  return state;
}

const AuthContext = React.createContext();
const DataContext = React.createContext();








function App() {
  const [authState, authDispatch] = useReducer(reducer, null);
  const [dataState, dataDispatch] = useReducer(inspection, null);



  const Refitem4 = useRef(0);


  const [userData, setUserData] = useState(null); // เพิ่ม state เพื่อเก็บข้อมูลผู้ใช้




  
useEffect(() => {
  setUserData(authState)

}, [authState])
  

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <DataContext.Provider value={{ dataState, dataDispatch }}>
 
    <div className="App">
    <div className="app-grid-container">
        <div className="app-grid-item item1-app"><HandleButton /></div>
        <div className="app-grid-item item2-app"></div>
            <div className="app-grid-item item3-app">
    { userData?  <UserArea userData={userData} />: null}  {/* ส่ง prop userData ไปยัง UserArea */} 
     
        </div>
            <div className="app-grid-item item4-app">
            <LoginFormEmail />
        <InformationDisplayArea userData={userData} setUserData={setUserData} /> {/* ส่ง prop userData และ setUserData ไปยัง InformationDisplayArea */} 
        </div>
        <div className="app-grid-item item5-app">5</div>
      </div>
          </div>
   
          </DataContext.Provider>
          </AuthContext.Provider>
  );







}


export { DataContext };
export { AuthContext };
export default App;
