// นำเข้า React และ hooks อื่น ๆ
import React, { useEffect, useReducer, useState } from "react";
import "./App.css"; // นำเข้าไฟล์ CSS เพื่อใช้ในการสร้างรูปแบบสำหรับ component
import HandleAdmin from "./templates/Admin/HandleAdmin";
import LoginFormEmail from "./templates/LoginFormEmail";
import UserArea from "./components/UserArea";
import InformationDisplayArea from "./templates/InformationDisplayArea";
import {
  CuttingContext,
  AuthContext,
  ResponseContext,
  StylesContext,
  ToollistContext,
} from "./contexts";

import ActivityListItem from "./templates/ActivityListItem";

import HandleUser from "./templates/User/HandleUser";
import OrderList from "./templates/Admin/OrderList";

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
function checkActionType(state, action) {
  if (action.type === "html") {
    return action.payload;
  }

  if (action.type === "text") {
    return action.payload;
  }

  if (action.type === "data") {
    return action.payload;
  }
  return state;
}

function examine(state, action) {
  if (action.type === "login") {
    return action.payload;
  }

  if (action.type === "logout") {
    return null;
  }
  return state;
}

const App = () => {
  const [authState, authDispatch] = useReducer(reducer, null);
  const [cuttingState, cuttingDispatch] = useReducer(checkActionType, null);
  const [toollistState, toollistDispatch] = useReducer(checkActionType, null);
  const [ResponseState, ResponseDispatch] = useReducer(examine, null);
  const [styleAction, SetStyleAction] = useState(null);

  const [UseType, setUseType] = useState("user");

  const [SupplierList, setSupplierList] = useState(null);
  const [ Provider , setProvider ] = useState(null);



  

  useEffect(() => {
    if (ResponseState) {
      setUseType(ResponseState.type);

      const supplierData = ResponseState.supplier;

      // ในกรณีที่ supplierData เป็น Object
      if (typeof supplierData === "object" && supplierData !== null) {
        setSupplierList(Object.entries(supplierData));
      }
    }
  }, [ResponseState]);

  const HandleChooseSupplier = (e) => {
    let id = e.target.id;
    alert('ผู้ใช้เลือก (Supplier):'+id);

    setProvider(id)



  };

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <CuttingContext.Provider value={{ cuttingState, cuttingDispatch }}>
        <ToollistContext.Provider value={{ toollistState, toollistDispatch }}>
          <ResponseContext.Provider value={{ ResponseState, ResponseDispatch }}>
            <StylesContext.Provider value={{ styleAction, SetStyleAction }}>
              <div className="App">
                <div className="app-grid-container">
                  <div className="app-grid-item item1-app">
                    {authState ? <UserArea userData={authState} /> : null}
                    <LoginFormEmail />
                  </div>
                  <div className="app-grid-item item2-app">
                    {UseType === "Admin" ? <HandleAdmin /> : <HandleUser />}
                  </div>

                  <div className="app-grid-item item3-app">
                    <div>
                      {SupplierList
                        ? SupplierList.map(([key, value]) => (
                            <button
                              key={key}
                              id={value}
                              onClick={HandleChooseSupplier}
                          >
                            email: { value} <br></br>
                         
                              {key}=ว่าง
                            </button>
                          ))
                        : null}
                    </div>

                    <div>22</div>
                    <div>   {UseType === "Admin" ? <OrderList/> : null}  </div>
                  </div>

                  <div className="app-grid-item item4-app">
                    <ActivityListItem />


                  </div>
                  <div className="app-grid-item item5-app">
                    {/*     <RegisterForm /> */}
                    <InformationDisplayArea  provider={Provider}  />
                  </div>
                  <div className="app-grid-item item6-app">6</div>
                </div>
              </div>
            </StylesContext.Provider>
          </ResponseContext.Provider>
        </ToollistContext.Provider>
      </CuttingContext.Provider>
    </AuthContext.Provider>
  );
};

export { CuttingContext, AuthContext, ResponseContext }; // ควรเพิ่มบรรทัดนี้เพื่อ export AuthContext
export default App;
