import React, { useContext, useState, useEffect } from 'react';
import { CuttingContext, ResponseContext, StylesContext, ToollistContext } from '../contexts';


function ActivityListItem() {
  const { cuttingDispatch } = useContext(CuttingContext);
  const { toollistState, toollistDispatch} = useContext(ToollistContext);

  const { ResponseState } = useContext(ResponseContext);
  const [items, setItems] = useState([]);
  const { styleAction, SetStyleAction } = useContext(StylesContext);
  



  
  useEffect(() => {
    if (ResponseState) {
      setItems([]);

      const json = ResponseState.user_data;


      json.forEach((dataObj, index) => {
        const _id = dataObj._id;
        const keyid = dataObj.keyid;
        const cutting = dataObj.data.cutting;
        const cuttingObj= JSON.parse(cutting);
        const cuttingMap = new Map(Object.entries(cuttingObj));


        const toollist = dataObj.data.toollist;
        const toollistObj= JSON.parse(toollist);
        const toollistMap = new Map(Object.entries(toollistObj));
   
         setItems( (prevItems) => [
            ...prevItems,
            <div
              key={`row_${index}`}
              id={_id}
              onClick={async (event) => {
                const tagId = event.target.id;

              await  cuttingDispatch({
                  type: "data",
                  payload: cuttingMap,
                });

                
              await  toollistDispatch({
                  type: "data",
                  payload: toollistMap,
                });

                SetStyleAction(true)
              }}
            >
      
           
      
              {keyid}
            </div>,
          ]);
        

        



           



        




        
        
 
      });
    }
  }, [ResponseState]);

  

  return <div>{items}</div>;
}

export default ActivityListItem;
