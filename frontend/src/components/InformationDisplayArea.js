import React, { useContext } from 'react';
import DataHtml from '../displayArea/DataHtml';
import ReadHtml from '../displayArea/ReadHtml';

import { DataContext } from '../App';

const InformationDisplayArea = () => {

    const { dataState, dataDispatch } = useContext(DataContext);




    
  return (
    <div className="area-grid-container">
    <div className="area-grid-item item1-area">{/* <DataHtml/> */}</div>
      <div className="area-grid-item item2-area">{ <ReadHtml data={dataState} /> }</div>
      <div className="area-grid-item item3-area">3</div>
      <div className="area-grid-item item4-area">4</div>
      <div className="area-grid-item item5-area">5</div>
    </div>
  );
};

export default InformationDisplayArea;
