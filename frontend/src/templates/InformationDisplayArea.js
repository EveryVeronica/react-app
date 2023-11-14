// InformationDisplayArea.js
import React, { useContext } from 'react';
import { DataContext, StylesContext } from '../contexts';

import ReadHtml from '../components/ReadHtml';  // ตรวจสอบว่าชื่อไฟล์และตำแหน่งถูกต้อง



const InformationDisplayArea = () => {
  const { dataState } = useContext(DataContext);
  const {Styles, setStyles} = useContext(StylesContext);






  if (!dataState) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {/* แสดงผลข้อมูลที่ได้จาก HTML */}
       
      {<ReadHtml data={dataState} set={Styles} />}
    </div>
  );
};

export default InformationDisplayArea;
