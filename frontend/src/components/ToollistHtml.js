import React from 'react';
import './ToollistHtml.css';

const ToollistHtml = ({ data,set}) => {
  if (!data) {
    return <div>No data available</div>;
  }


  const items = data.get("text1").map((item, idx) => (
    <div className="grid-container" key={idx} style={set === true ? { backgroundColor: "red" } : { backgroundColor: "blue" }}>
      <div className="toollist-item">{data.get("text1")[idx]}</div>
      <div className="toollist-item-name">{data.get("text2")[idx]}</div>
      <div className="toollist-item-description">{data.get("text3")[idx]}</div>
      <div className="toollist-item-diameter">{data.get("text4")[idx]}</div>
      <div className="toollist-item-length">{data.get("text5")[idx]}</div>
      <div className="toollist-item-radius">{data.get("text6")[idx]}</div>
      <div className="toollist-item-adjust">{data.get("text7")[idx]}</div>
      <div className="toollist-item-offset">{data.get("text8")[idx]}</div>
      <div className="toollist-item-type">{data.get("text9")[idx]}</div>

    </div>
  ));

  return <div>{items}</div>;
};

export default ToollistHtml;
