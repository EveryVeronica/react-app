// HandleButton.js
import React, { useContext } from 'react';
import { DataContext } from '../contexts';

const HandleButton = () => {
  const { dataDispatch } = useContext(DataContext);

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(content, 'text/html');

        const selectors = [
          ".item1", ".item2", ".item3",
          ".item4", ".item5", ".item6",
          ".item7", ".item8", ".item9",
          ".item10", ".item11", ".item12"
        ];

        const key = [
          "text1", "text2", "text3",
          "text4", "text5", "text6",
          "text7", "text8", "text9",
          "text10", "text11", "text12"
        ];

        const listDataMap = new Map();

        selectors.forEach((selector, index) => {
          const elements = htmlDoc.querySelectorAll(selector);
          const textContentList = Array.from(elements).map(element => element.textContent.trim());
          listDataMap.set(key[index], textContentList);
        });

        dataDispatch({
          type: 'import',
          payload: listDataMap,
        });

        console.log('Item Content:', listDataMap);
      };

      reader.readAsText(file);
    }
  };

  const handleView = () => {
    // ทำอะไรก็ตามที่เกี่ยวข้องกับการแสดงผลข้อมูลที่ได้จาก HTML
  };

  const handleSave = () => {
    // โค้ดการบันทึกข้อมูลลง MongoDB
  };

  return (
    <div>
      <input id="fileInput" onChange={handleImportFile} type="file" />
      <button onClick={() => document.querySelector('input[type="file"]').click()}>Import HTML File</button>
      <button onClick={handleView}>View</button>
    </div>
  );
};

export default HandleButton;
