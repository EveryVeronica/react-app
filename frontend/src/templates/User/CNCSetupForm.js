import React, { useState } from "react";
import { reportMachine } from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";


const CNCSetupForm = ({provider}) => {
  const [toolNumbers, setToolNumbers] = useState(
    Array.from({ length: 4 }, () => [{}])
  );
  const [workpieceSetup, setWorkpieceSetup] = useState({});

  const handleToolInputChange = (toolNumber, index, field, value) => {
    const updatedTools = [...toolNumbers];
    updatedTools[toolNumber - 1][index][field] = value;
    setToolNumbers(updatedTools);
  };

  const handleHolderTypeChange = (toolNumber, index, value) => {
    const updatedTools = [...toolNumbers];
    updatedTools[toolNumber - 1][index].holderType = value;

    const defaultValues = {
      HolderType1: {
        image: "/images/path_to_holder_image_1.png",
        diameter: "default_value_holder_type_1",
      },
      HolderType2: {
        image: "/images/path_to_holder_image_2.png",
        diameter: "default_value_holder_type_2",
      },
      HolderType3: {
        image: "/images/path_to_holder_image_3.png",
        diameter: "default_value_holder_type_3",
      },
      HolderType4: {
        image: "/images/path_to_holder_image_4.png",
        diameter: "default_value_holder_type_4",
      },
      HolderType5: {
        image: "/images/path_to_holder_image_5.png",
        diameter: "default_value_holder_type_5",
      },
      HolderType6: {
        image: "/images/path_to_holder_image_6.png",
        diameter: "default_value_holder_type_6",
      },
      HolderType7: {
        image: "/images/path_to_holder_image_7.png",
        diameter: "default_value_holder_type_7",
      },
      HolderType8: {
        image: "/images/path_to_holder_image_8.png",
        diameter: "default_value_holder_type_8",
      },
    };

    updatedTools[toolNumber - 1][index].holderImage =
      defaultValues[value]?.image || "";
    setToolNumbers(updatedTools);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tool Numbers Setup:"+ provider, toolNumbers);
    console.log("Workpiece Setup:", workpieceSetup);



    const userToken = await auth.currentUser.getIdToken();
   
   const report = await reportMachine(userToken, {

      machine: {
        permit: provider,//อนุญาตใหผู้ให้บริการ
        author: auth.currentUser.email, // ผู้แต่ง  สั่งการ
        heading:null, // ชื่อเรื่อง 
        report: {    //ข้อมูลการ รายงาน
          tools: toolNumbers,
          data_workpiece:workpieceSetup
        }
      }

   })
    
   console.log('dddddddddddddddddddddddd'+report)
  };



  const renderToolInputs = (tool, toolNumber, index) => (
    <div key={index} className="toollist-grid-container">
      <div className="toollist-item">{toolNumber + 1}</div>
      <select
        className="toollist-item-name"
        value={tool.holderType || ""}
        onChange={(e) =>
          handleHolderTypeChange(toolNumber + 1, index, e.target.value)
        }
        required
      >
        <option value="">Select Holder Type</option>
        <option value="HolderType1">Collet Chuck (คอลเล็ต ชัค):</option>
        <option value="HolderType2">Hydraulic Chuck (ไฮดรอลิค ชัค):</option>
        <option value="HolderType3">Milling Chuck (มิลลิ่ง ชัค):</option>
        <option value="HolderType4">Drill Chuck (ดริล ชัค):</option>
        <option value="HolderType5">ER Collet (อีอาร์ คอลเลต):</option>
        <option value="HolderType6">Capto System:</option>
        <option value="HolderType7">HSK (Hohl Schaft Kegel):</option>
        <option value="HolderType8">CAT (V-Flange Tooling):</option>
      </select>
      <img
        className="toollist-item-description"
        src={tool.holderImage}
        alt={`Holder ${toolNumber + 1}`}
        style={{ width: "50px", height: "50px" }}
      />

      {/* Dropdown for the "method" field */}
      <select
        className="toollist-item-method"
        value={tool.method || ""}
        onChange={(e) =>
          handleToolInputChange(toolNumber + 1, index, "method", e.target.value)
        }
        required
      >
        <option value="Rough">Rough</option>
        <option value="Finish">Finish</option>

        {/* Add more options as needed */}
      </select>

      {/* Dropdown for the "Type" field */}
      <select
        className="toollist-item-type"
        value={tool.Type || ""}
        onChange={(e) =>
          handleToolInputChange(toolNumber + 1, index, "Type", e.target.value)
        }
        required
      >
        <option value="EndMill">#1 End Mill</option>
        <option value="DrillBits">#2 Drill Bits</option>
        <option value="FaceMill">#3 Face Mill</option>
        <option value="Reamers">#4 Reamers</option>
        <option value="GearCutters">#5 Gear Cutters</option>
        <option value="HollowMill">#6 Hollow Mill</option>
        <option value="ThreadMill">#7 Thread Mill</option>
        <option value="SlabMill">#8 Slab Mill</option>
        <option value="FlyCutter">#9 Fly Cutter</option>
        {/* Add more options as needed */}
      </select>

      {/* แสดงภาพเมื่อมีการเลือก "Type" */}
      {tool.Type && (
        <div>
          <img
            src={`/images/ToolTypes/${tool.Type.toLowerCase()}.jpeg`}
            alt={`${tool.Type} Image`}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      )}

      {["diameter", "length", "stock"].map((field) => (
        <input
          key={field}
          className={`toollist-item-${field.toLowerCase()}`}
          type="text"
          placeholder={`Enter ${
            field.charAt(0).toUpperCase() + field.slice(1)
          }`}
          value={tool[field] || ""}
          onChange={(e) =>
            handleToolInputChange(toolNumber + 1, index, field, e.target.value)
          }
        />
      ))}
    </div>
  );
  return (
    <div className="cnc-setup-form">
      <h2>CNC Machine Setup Form</h2>
      <form onSubmit={handleSubmit}>
        <h3>Tool Setup For [{provider}]</h3>
        <div className="toollist-grid-container">
          <div className="toollist-item">Tool Number</div>
          <div className="toollist-item-name">Tool Name</div>
          <div className="toollist-item-description">Description</div>
          <div className="toollist-item-type-img">image</div>
          <div className="toollist-item-type">Tool Type</div>
          <div className="toollist-item-method">Finish-Rough</div>
          <div className="toollist-item-diameter">Diameter</div>
          <div className="toollist-item-length">Length</div>

          <div className="toollist-item-stock">Stock</div>
        </div>
        {toolNumbers.map((tools, toolNumber) =>
          tools.map((tool, index) => renderToolInputs(tool, toolNumber, index))
        )}
        <h3>Workpiece Setup</h3>
        <div>
          <label htmlFor="materialType">Material Type:</label>
          <select
            id="materialType"
            value={workpieceSetup.materialType || ""}
            onChange={(e) =>
              setWorkpieceSetup({
                ...workpieceSetup,
                materialType: e.target.value,
              })
            }
            required
          >
            <option value="">Select Material Type</option>
            <option value="Aluminum">Aluminum</option>
            <option value="StainlessSteel">Stainless Steel</option>
            <option value="Steel">Steel</option>
            <option value="Plastic">Plastic</option>
          </select>
        </div>
        {["width", "length", "height"].map((field) => (
          <div key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type="text"
              id={field}
              value={workpieceSetup[field] || ""}
              onChange={(e) =>
                setWorkpieceSetup({
                  ...workpieceSetup,
                  [field]: e.target.value,
                })
              }
              required
            />
          </div>
        ))}
        <label htmlFor="visesType">Vises Type:</label>
        <select
          id="visesType"
          value={workpieceSetup.visesType || ""}
          onChange={(e) =>
            setWorkpieceSetup({ ...workpieceSetup, visesType: e.target.value })
          }
          required
        >
          <option value="">Select Vises Type</option>
          <option value="MillingMachineVise">Milling Machine Vise</option>
          <option value="StepClamps">StepClamps</option>
          <option value="ToeClamps">ToeClamps</option>
        </select>
        {workpieceSetup.visesType && (
          <div>
            <img
              src={`/images/vises/path_to_${workpieceSetup.visesType.toLowerCase()}.png`}
              alt={`${workpieceSetup.visesType} Image`}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CNCSetupForm;
