// InformationDisplayArea.js
import React, { useContext } from 'react';
import { DataContext } from '../contexts';

import ReadHtml from '../components/ReadHtml';  // ตรวจสอบว่าชื่อไฟล์และตำแหน่งถูกต้อง



const InformationDisplayArea = () => {
  const { dataState } = useContext(DataContext);

  if (!dataState) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {/* แสดงผลข้อมูลที่ได้จาก HTML */}
       
      {<ReadHtml data={ dataState} />}
    </div>
  );
};

export default InformationDisplayArea;
