// HandleAdmin.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, CuttingContext, ResponseContext, StylesContext, ToollistContext } from "../../contexts";
import "./HandleAdmin.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { getData, saveData } from "../../services/api";

const HandleAdmin = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { cuttingState, cuttingDispatch } = useContext(CuttingContext);
  const { toollistState, toollistDispatch} = useContext(ToollistContext);

  const {ResponseState, ResponseDispatch } = useContext(ResponseContext);
  const {styleAction, SetStyleAction} = useContext(StylesContext);


  const [projectname, setProjectname] = useState('');



















  const HandleCutting = (event) => {

    SetStyleAction(false)


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

          cuttingDispatch({
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


  const HandleToollist = (event) => {

    SetStyleAction(false)


    if (authState) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(content, "text/html");

          const selectors = [
            ".toollist-item",
            ".toollist-item-name",
            ".toollist-item-description",
            ".toollist-item-diameter",
            ".toollist-item-length",
            ".toollist-item-radius",
            ".toollist-item-adjust",
            ".toollist-item-offset",
            ".toollist-item-type",
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
          ];

          const listDataMap = new Map();

          selectors.forEach((selector, index) => {
            const elements = htmlDoc.querySelectorAll(selector);
            const textContentList = Array.from(elements).map((element) =>
              element.textContent.trim()
            );
            listDataMap.set(key[index], textContentList);
          });

          toollistDispatch({
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


     // console.log("Data:", result);
      // Update state or perform other actions with the data
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      const userToken = await auth.currentUser.getIdToken();
      if (cuttingState && toollistState) {
        // แปลง Map เป็น JSON string
        const cutting = JSON.stringify(Object.fromEntries(cuttingState));
        const toollist = JSON.stringify(Object.fromEntries(toollistState));

/* 
        {
          cutting: cutting,
          toollist,toollist
        }
 */

   
        const response = await saveData(userToken, 
        
      {  
        machine: {
          permit: auth.currentUser.email,//อนุญาตใหผู้ให้บริการ
          author:null,// ผู้แต่ง  สั่งการ 
          customer: null, //หมายถึงลูกค้า ของเรา
          heading:projectname, // ชื่อเรื่อง 
          setup: {    //ข้อมูลการ การ setup
            tools: toollist,
            data_workpiece: null,
            cutting:cutting
          },
          
        }
        }
        
        
        
        
        
        );
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
    <>
 
      <input id="cuttingseq" onChange={HandleCutting} type="file" />
      <button
        className="import btn-cuttingseq"
        onClick={() => document.querySelector('input[id="cuttingseq"]').click()}
      >
        cuttingseq
      </button>




      <input  id="toollist" onChange={HandleToollist} type="file" />
      <button
          className="import btn-toollist"
        onClick={() => document.querySelector('input[id="toollist"]').click()}
      >
        toollist
      </button>


      <input className="import input-projectname" type="projectname" value={projectname} onChange={(e) => setProjectname(e.target.value)} />


      <button className="import btn-reface" onClick={handleView}>reface</button>
      <button className="import btn-save" onClick={handleSave}>save</button>
      
    </>
  );
};

export default HandleAdmin;
