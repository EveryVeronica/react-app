import React, { useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext, CuttingContext, ResponseContext } from "../App"; // ปรับแต่งตามต้องการ
import './LoginFormEmail.css'

import { getData, logged } from "../services/api";

const LoginFormEmail = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { cuttingDispatch } = useContext(CuttingContext);
  const { ResponseDispatch } = useContext(ResponseContext);

  // สร้าง state เพื่อเก็บค่า email, password, และ error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // ตรวจสอบว่ามีการกรอก email และ password หรือไม่
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      // ตรวจสอบว่า email ที่กรอกเป็น Gmail หรือไม่
      if (!isEmailValid(email)) {
        setError("Please enter a valid Gmail address.");
        return;
      }

      // ล็อกอินผู้ใช้
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", response.user.uid);
      //  console.log('sssssssssssssssss'+await response.user.getIdToken())
      // ล้างค่า error ในกรณีที่ล็อกอินสำเร็จ
      setError(null);

      // ส่ง Token ไปที่ /logged เมื่อล็อกอินสำเร็จ
      await sendTokenToServer(await response.user.getIdToken());

      // ทำตามความต้องการ เช่น นำผู้ใช้ไปที่หน้า Dashboard, set user, ฯลฯ
      console.log("User logged in:", response.user.uid);
      console.log("Login successful! Welcome, " + response.user.email);
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  // ฟังก์ชันสำหรับส่ง Token ไปที่ /logged
  const sendTokenToServer = async (token) => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      const responseData = await getData(userToken);

      // ตรวจสอบว่ามีข้อมูลที่ได้จากการเรียก API หรือไม่
      if (responseData) {
        console.log("Data from /logged API:", responseData);

        await ResponseDispatch({
          type: "login",
          payload: responseData,
        });

        // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้ เช่นแสดงผลทาง UI
        // ตัวอย่าง: แสดงชื่อผู้ใช้ที่ได้จาก /logged API
        alert(`Welcome, ${responseData.username}!`);
      } else {
        console.log("No data from /logged API");
      }
    } catch (error) {
      console.error("Error in sendTokenToServer:", error.message);
      // จัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  };

  // ฟังก์ชันสำหรับการล็อกเอาท์
  const handleLogout = () => {
    // เรียกใช้ฟังก์ชัน signOut จาก Firebase
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        // ทำตามความต้องการหลังจาก logout
        cuttingDispatch({
          type: "html",
          payload: null,
        });
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
        // ทำตามความต้องการเพื่อจัดการข้อผิดพลาด
      });
  };

  // ฟังก์ชันสำหรับตรวจสอบว่า email เป็น Gmail หรือไม่
  const isEmailValid = (email) => {
    // ใช้ regex ในการตรวจสอบว่าเป็นอีเมล Gmail หรือไม่
    const gmailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/;
    return gmailRegex.test(email);
  };

  // useEffect สำหรับตรวจสอบการเปลี่ยนแปลงใน authentication state
  useEffect(() => {
    // เรียกใช้ onAuthStateChanged เพื่อตรวจสอบสถานะของผู้ใช้
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(JSON.stringify(user, null, 2));

        // ถ้ามีผู้ใช้ล็อกอิน
        authDispatch({
          type: "login",
          payload: user,
        });
      } else {
        // ถ้าไม่มีผู้ใช้ล็อกเอาท์
        authDispatch({
          type: "logout",
          payload: null,
        });
      }
    });

    // คืนฟังก์ชัน unsubscribe เพื่อทำความสะอาด
    return () => unsubscribe();
  }, [auth, authDispatch]);

  // ตรวจสอบว่ามี authentication state หรือไม่
  if (authState) {
    // ถ้ามี authentication state แสดงปุ่ม Log Out
    return (<><button className="login-form btn-logout" onClick={handleLogout}>LogOut</button> <div className="login-form"></div></>)
  } else {
    // ถ้าไม่มี authentication state แสดงฟอร์มสำหรับล็อกอิน
    return (
    <>
       
        <div className="login-form label"> { error && <p style={{ color: "red" }}>{error}</p> }</div>
      <div className="login-form label-email">Email:</div>
       <input
        className="login-form input-email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
      <div className="login-form label-password">Password:</div>
       <input
           className="login-form input-password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
      <button className="login-form btn-login" onClick={handleLogin}>Login</button>

  
      
      <div className="login-form"></div>
       

      </>
       



       

    );
  }
};

// ส่งออก Component LoginFormEmail
export default LoginFormEmail;
