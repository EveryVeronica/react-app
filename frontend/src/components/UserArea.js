import React from 'react';
import './UserArea.css'; // นำเข้าไฟล์ CSS

const UserArea = ({ userData}) => {
  return (

    <>
      <img className="login-form user-avatar" src={userData.avatar} alt="Avatar" />

    <div className="login-form user-first-name">[]:{userData.firstName}</div>
    <div className="login-form user-last-name">[]:{userData.lastName}</div>
    <div className="login-form user-email">[Email:][{userData.email}]</div>
      <div className="login-form user-phone">[]:{userData.phoneNumber}</div>
    
     
      
      </>


  );
};

export default UserArea;
