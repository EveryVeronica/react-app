import React, { useContext } from 'react';
import { DataContext } from '../App';


const HandleButton = () => {
    


    const { dataState, dataDispatch } = useContext(DataContext);







    
    const handleImportFile = (event) => {
      // โค้ดการ import ไฟล์ .html จะถูกเรียกเมื่อผู้ใช้กดปุ่ม
      // คุณสามารถทำตามขั้นตอนที่ต้องการทำในฟังก์ชันนี้
      // เช่น ใช้ FileReader API เพื่ออ่านเนื้อหาของไฟล์ .html
  
      // ตัวอย่าง: ใช้ FileReader API

        const file = event.target.files[0];
        setTimeout(() => {
            console.log('การทำงานหลังจากผ่านไป 3000 มิลลิวินาที');
            handleRead(file)
          
          }, 1000); // 3000 มิลลิวินาที (3 วินาที)
        
        if (file) {
          const reader = new FileReader();
  
          reader.onload = (e) => {
            const content = e.target.result;
              console.log('Content of the HTML file:', content);
              


       
            // ทำตามความต้องการของคุณกับเนื้อหาไฟล์ .html ที่อ่านได้ที่นี่
          };
  
          reader.readAsText(file);
        }
      
  
    };

    const handleview = () => { 

    }

    const handleRead = (fileInput) => {
     
        const file = fileInput;
      
        if (file) {
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const content = e.target.result;
      
            // ใช้ DOMParser เพื่อแปลง HTML string เป็น DOM object
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(content, 'text/html');
      
            const selectors = [".item1", ".item2", ".item3", ".item4", ".item5", ".item6", ".item7", ".item8", ".item9", ".item10", ".item11", ".item12"];
            const key = ["text1", "text2", "text3", "text4", "text5", "text6", "text7", "text8", "text9", "text10", "text11", "text12"];
      
            const listDataMap = new Map();
      
            selectors.forEach((selector, index) => {
              const elements = htmlDoc.querySelectorAll(selector);
              const textContentList = Array.from(elements).map(element => element.textContent.trim());
              listDataMap.set(key[index], textContentList);
            });
            dataDispatch({
                type: 'import',
                payload: listDataMap,
              })
            console.log('Item Content:', listDataMap);
          };
      
          reader.readAsText(file);
        }
      };
      
      

  const handleSave = () => {
    // โค้ดการบันทึกข้อมูลลง MongoDB
  };

  return (
    <div>
          <input id="fileInput" onChange={handleImportFile} type="file" />
           {/* หรือสามารถใช้ปุ่มเพื่อเปิดไฟล์เลือกได้ */}
      <button onClick={() => document.querySelector('input[type="file"]').click()}>Import HTML File</button>
   <button onClick={handleview}>view</button> 
    </div>
  );
};

export default HandleButton;
