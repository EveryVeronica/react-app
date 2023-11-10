import React from 'react';

const DataHtml = ({ htmlData }) => {
  return (
    <div className="dataHtml" dangerouslySetInnerHTML={{ __html: htmlData }} />
  );
};

export default DataHtml;
