// นำเข้า React และ hooks อื่น ๆ
import React, { useEffect, useReducer, useState } from "react";
import './App.css'; // นำเข้าไฟล์ CSS เพื่อใช้ในการสร้างรูปแบบสำหรับ component
import HandleButton from './components/HandleButton';
import LoginFormEmail from './components/LoginFormEmail';
import UserArea from './components/UserArea';
import InformationDisplayArea from './components/InformationDisplayArea';
import { DataContext, AuthContext } from './contexts';

// ฟังก์ชัน reducer สำหรับการจัดการ state ของ authentication
function reducer(state, action) {
  if (action.type === "login") {
    return action.payload;
  }

  if (action.type === "logout") {
    return null;
  }
  return state;
}

// ฟังก์ชัน inspection สำหรับการจัดการ state ของข้อมูลที่นำเข้า
function inspection(state, action) {
  if (action.type === "import") {
    return action.payload;
  }

  if (action.type === "export") {
    return null;
  }
  return state;
}

const App = () => {
  const [authState, authDispatch] = useReducer(reducer, null);
  const [dataState, dataDispatch] = useReducer(inspection, null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(authState); // อัปเดตข้อมูลผู้ใช้เมื่อ authState เปลี่ยนแปลง
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <DataContext.Provider value={{ dataState, dataDispatch }}>
        <div className="App">
          <div className="app-grid-container">
            <div className="app-grid-item item1-app"><HandleButton /></div>
            <div className="app-grid-item item2-app"></div>
            <div className="app-grid-item item3-app">
              {userData ? <UserArea userData={userData} /> : null} {/* แสดง UserArea ถ้ามีข้อมูลผู้ใช้ */}
            </div>
            <div className="app-grid-item item4-app">
              <LoginFormEmail />
              <InformationDisplayArea />
            </div>
            <div className="app-grid-item item5-app">5</div>
          </div>
        </div>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export { DataContext, AuthContext }; // ควรเพิ่มบรรทัดนี้เพื่อ export AuthContext
export default App;
