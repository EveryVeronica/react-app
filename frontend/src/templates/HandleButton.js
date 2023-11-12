// HandleButton.js
import React, { useContext } from 'react';
import { AuthContext, DataContext } from '../contexts';
import './HandleButton.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { getData, saveData } from '../services/api';

const HandleButton = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const {dataState, dataDispatch } = useContext(DataContext);


  const handleImportFile = (event) => {
    if (authState) {
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
          type: 'html',
          payload: listDataMap,
        });

        console.log('Item Content:', listDataMap);
      };

      reader.readAsText(file);
      }
    } else {
      console.log('Please log in before proceeding'); 

    }
  };
  const handleView = async () => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      const result = await getData(userToken);
      console.log('Data:', result.data);
      // Update state or perform other actions with the data
    } catch (error) {
      console.error('Error retrieving data:', error.message);
    }
  };

  
  



  const handleSave = async () => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      if (dataState) {



/*         const myMap = new Map(Object.entries(dataState));

        console.log(myMap); */

/*         const myArray = Object.entries(dataState);

console.log(myArray); */
        
        // ใช้ Array.from()
        // แปลง Map เป็น JSON string
// แปลง Map เป็น JSON string
const jsonString = JSON.stringify(Object.fromEntries(dataState));

/*         console.log(dataState.get('text1'))
console.log(dataState.get('text2')) */
        
        

                  // นำ resultString ไปใช้งานต่อ
               //   console.log(resultString);
                  const response = await saveData(userToken, jsonString);
                  console.log('Data saved successfully:', response);


      } else {
        console.log('Data saved Error:');
        
      }
      
   
      // Update state or perform other actions after saving data
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  


  return (
    <div>
      <input id="fileInput" onChange={handleImportFile} type="file" />
      <button onClick={() => document.querySelector('input[type="file"]').click()}>Import HTML File</button>
      <button onClick={handleView}>View</button>
      <button onClick={handleSave}>save</button>
   
    </div>
  );
};

export default HandleButton;
