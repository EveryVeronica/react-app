// HandleButton.js
import React, { useContext, useState } from "react";
import { AuthContext, DataContext, ResponseContext, StylesContext } from "../contexts";
import "./HandleButton.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getData, saveData } from "../services/api";

const HandleButton = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);
  const { ResponseDispatch } = useContext(ResponseContext);
  const {Styles, setStyles} = useContext(StylesContext);


  const [projectname, setProjectname] = useState('');




  const handleImportFile = (event) => {

    setStyles(false)


    if (authState) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(content, "text/html");

          const selectors = [
            ".item1",
            ".item2",
            ".item3",
            ".item4",
            ".item5",
            ".item6",
            ".item7",
            ".item8",
            ".item9",
            ".item10",
            ".item11",
            ".item12",
          ];

          const key = [
            "text1",
            "text2",
            "text3",
            "text4",
            "text5",
            "text6",
            "text7",
            "text8",
            "text9",
            "text10",
            "text11",
            "text12",
          ];

          const listDataMap = new Map();

          selectors.forEach((selector, index) => {
            const elements = htmlDoc.querySelectorAll(selector);
            const textContentList = Array.from(elements).map((element) =>
              element.textContent.trim()
            );
            listDataMap.set(key[index], textContentList);
          });

          dataDispatch({
            type: "html",
            payload: listDataMap,
          });

          console.log("Item Content:", listDataMap);
        };

        //reader.readAsText(file);
        reader.readAsText(file, `${file.name}?timestamp=${Date.now()}`);
      }
    } else {
      console.log("Please log in before proceeding");
    }
   
  };
  const handleView = async () => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      const result = await getData(userToken);


      await ResponseDispatch({
        type: "login",
        payload: result,
      });


      console.log("Data:", result.data);
      // Update state or perform other actions with the data
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      if (dataState) {
        // แปลง Map เป็น JSON string
        const jsonString = JSON.stringify(Object.fromEntries(dataState));
const keyid= projectname
        const response = await saveData(userToken,keyid, jsonString);
        console.log("Data saved successfully:", response);
      } else {
        console.log("Data saved Error:");
      }

      // Update state or perform other actions after saving data
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  return (
    <div>
      <input id="fileInput" onChange={handleImportFile} type="file" />
      <button
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Import HTML File
      </button>


      <input type="projectname" value={projectname} onChange={(e) => setProjectname(e.target.value)} />


      <button onClick={handleView}>View</button>
      <button onClick={handleSave}>save</button>
    </div>
  );
};

export default HandleButton;
