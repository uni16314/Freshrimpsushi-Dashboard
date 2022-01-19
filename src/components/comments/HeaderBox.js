import React from 'react';
import './comments.scss';

const HeaderItem = ({ headData, colScope }) => {
  return (
    <>
      {headData.map((data) => (
        <div
          className="header-item"
          key={data.idx}
          style={{ width: colScope[data.idx - 1] }}
        >
          {data.title}
        </div>
      ))}
    </>
  );
};

const HeaderBox = ({ headData, colScope }) => {
  return <HeaderItem headData={headData} colScope={colScope} />;
};

export default HeaderBox;
