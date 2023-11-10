import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { AuthContext } from '../App'; // ปรับแต่งตามต้องการ

const LoginFormEmail = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  
  // สร้าง state เพื่อเก็บค่า email, password, และ error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // ฟังก์ชันสำหรับการล็อกอิน
  const handleLogin = async () => {
    try {
      // ตรวจสอบว่ามีการกรอก email และ password หรือไม่
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      // ตรวจสอบว่า email ที่กรอกเป็น Gmail หรือไม่
      if (!isEmailValid(email)) {
        setError('Please enter a valid Gmail address.');
        return;
      }

      // ล็อกอินผู้ใช้
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', response.user.uid);

      // ล้างค่า error ในกรณีที่ล็อกอินสำเร็จ
      setError(null);

      // ทำตามความต้องการ เช่น นำผู้ใช้ไปที่หน้า Dashboard, set user, ฯลฯ
      console.log('User logged in:', response.user.uid);
      console.log('Login successful! Welcome, ' + response.user.email);
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  // ฟังก์ชันสำหรับการล็อกเอาท์
  const handleLogout = () => {
    // เรียกใช้ฟังก์ชัน signOut จาก Firebase
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        // ทำตามความต้องการหลังจาก logout
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
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
        // ถ้ามีผู้ใช้ล็อกอิน
        authDispatch({
          type: 'login',
          payload: user,
        });
      } else {
        // ถ้าไม่มีผู้ใช้ล็อกเอาท์
        authDispatch({
          type: 'logout',
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
    return <button onClick={handleLogout}>Log Out</button>;
  } else {
    // ถ้าไม่มี authentication state แสดงฟอร์มสำหรับล็อกอิน
    return (
      <div>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* แสดงข้อความ error ถ้ามี */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }
};

// ส่งออก Component LoginFormEmail
export default LoginFormEmail;
