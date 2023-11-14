import React, { useContext, useState, useEffect } from 'react';
import { DataContext, ResponseContext, StylesContext } from '../contexts';


function ActivityListItem() {
  const { dataDispatch } = useContext(DataContext);
  const { ResponseState } = useContext(ResponseContext);
  const [items, setItems] = useState([]);
  const {Styles, setStyles} = useContext(StylesContext);
  useEffect(() => {
    if (ResponseState) {
      setItems([]);
      const json = ResponseState.data;

      json.forEach((dataObj, index) => {
        const _id = dataObj._id;
        const keyid = dataObj.keyid;
        const jsondata = dataObj.data;
        const jsonObject = JSON.parse(jsondata);
        const resultMap = new Map(Object.entries(jsonObject));

   
          setItems((prevItems) => [
            ...prevItems,
            <div
              key={`row_${index}`}
              id={_id}
              onClick={(event) => {
                const tagId = event.target.id;
/*                 console.log(tagId);
                console.log(resultMap); */
                dataDispatch({
                  type: "data",
                  payload: resultMap,
                });

                setStyles(true)
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
