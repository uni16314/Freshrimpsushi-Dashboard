import React from 'react';
import './comments.scss';

const HeaderItem = ({ headData, colScope }) => {
  return (
    <tr className='header-tr'>
      {headData.map((data) => (
        <th className="header-item" key={data.idx} style={{ width: colScope[data.idx - 1] }}>
          {data.title}
        </th>
      ))}
    </tr>
  );
};

const HeaderBox = ({ headData, colScope }) => {
  return <HeaderItem headData={headData} colScope={colScope} />;
};

export default HeaderBox;
