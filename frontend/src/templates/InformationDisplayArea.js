// InformationDisplayArea.js
import React, { useContext } from 'react';
import { CuttingContext, StylesContext, ToollistContext } from '../contexts';

import CuttingHtml from '../components/CuttingHtml';  // ตรวจสอบว่าชื่อไฟล์และตำแหน่งถูกต้อง
import ToollistHtml from '../components/ToollistHtml';



const InformationDisplayArea = () => {
  const { cuttingState } = useContext(CuttingContext);
  const { toollistState, toollistDispatch} = useContext(ToollistContext);

  const {styleAction, SetStyleAction} = useContext(StylesContext);








  return (
    <div>
      {/* แสดงผลข้อมูลที่ได้จาก HTML */}
       
      {cuttingState ? <CuttingHtml data={cuttingState} set={styleAction} /> : null }
      {toollistState ? <ToollistHtml data={toollistState} set={styleAction} /> : null}

    </div>
  );
};

export default InformationDisplayArea;
