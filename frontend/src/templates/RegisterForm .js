import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; // import Firebase authentication object
import {
    createUserWithEmailAndPassword,

  } from "firebase/auth";
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    



  const handleRegister = async () => {
    try {
      // สร้างผู้ใช้ด้วยอีเมลและรหัสผ่าน
      await createUserWithEmailAndPassword(auth,email, password);

      // ถ้าการลงทะเบียนสำเร็จ ทำตามความต้องการ
      console.log('Registration successful!');
    } catch (error) {
      // หากเกิดข้อผิดพลาดในการลงทะเบียน
      console.error('Error during registration:', error.message);
      setError('Registration failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {/* แสดงข้อความ error ถ้ามี */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
