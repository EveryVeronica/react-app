// ReadHtml.js
import React from 'react';
import './ReadHtml.css';
const ReadHtml = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const items = [];

  data.get("text3").forEach((item, idx) => {
    items.push(
      <div className="grid-container" key={idx}>
        <div className="item1">Program</div>
        <div className="item2">{data.get("text2")[idx]}</div>
        <div className="item3">{data.get("text3")[idx]}</div>
        <div className="item4">Cut Feed</div>
        <div className="item5">Part Stock</div>
        <div className="item6">Path image</div>
        <div className="item7">{data.get("text7")[idx]}</div>
        <div className="item8">{data.get("text8")[idx]}</div>
        <div className="item9">{data.get("text9")[idx]}</div>
        <div className="item10">{data.get("text10")[idx]}</div>
        <div className="item11">{data.get("text11")[idx]}</div>
        <div className="item12">{data.get("text12")[idx]}</div>
      </div>
    );
  });

  return <div>{items}</div>;
};

export default ReadHtml;
