import React, { useContext, useState, useEffect } from 'react';
import { ResponseContext } from '../contexts';
import './ActivityList.css'; // Import your CSS file

function ActivityListRow({ resultMap, idx }) {
  return (
    <div className="grid-container">
      <div className="item1">Program</div>
      <div className="item2">{resultMap.get("text2")[idx]}</div>
      <div className="item3">{resultMap.get("text3")[idx]}</div>
      <div className="item4">Cut Feed</div>
      <div className="item5">Part Stock</div>
      <div className="item6">Path image</div>
      <div className="item7">{resultMap.get("text7")[idx]}</div>
      <div className="item8">{resultMap.get("text8")[idx]}</div>
      <div className="item9">{resultMap.get("text9")[idx]}</div>
      <div className="item10">{resultMap.get("text10")[idx]}</div>
      <div className="item11">{resultMap.get("text11")[idx]}</div>
      <div className="item12">{resultMap.get("text12")[idx]}</div>
    </div>
  );
} 

function ActivityList() {
  const { ResponseState } = useContext(ResponseContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (ResponseState) {
      setItems([])

      const json = ResponseState.data;

      json.forEach((dataObj, index) => {
        const jsondata = dataObj.data;
        const jsonObject = JSON.parse(jsondata);
        const resultMap = new Map(Object.entries(jsonObject));

        resultMap.get("text3").forEach((item, idx) => {
          setItems((prevItems) => [
            ...prevItems,
            <div key={`row_${index}_col_${idx}`}>
              {idx === 0 && <br />}
              {idx === 0 && <br />}
              {idx === 0 && <br />}
              <ActivityListRow resultMap={resultMap} idx={idx} />
            </div>,
          ]);
        });
      });
    }
  }, [ResponseState]);

  return <div>{items}</div>;
}

export default ActivityList;
