import React from 'react';
import './UserArea.css'; // นำเข้าไฟล์ CSS

const UserArea = ({ userData}) => {
  return (
    <div className="user-area-container">
      <h2>User Information</h2>
      <div>
        <strong>UID:</strong> {userData.uid}
      </div>
      <div>
        <strong>Avatar:</strong> <img src={userData.avatar} alt="Avatar" />
      </div>
      <div>
        <strong>First Name:</strong> {userData.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {userData.lastName}
      </div>
      <div>
        <strong>Phone Number:</strong> {userData.phoneNumber}
      </div>
      <div>
        <strong>Email:</strong> {userData.email}
      </div>

    </div>
  );
};

export default UserArea;
