import React, { useContext } from 'react';
import PageContext from '../../contexts/PageContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './comments.scss';

const PaginationBox = () => {
  const { pages, setPages } = useContext(PageContext);

  function createArray(num) {
    let array = [];
    for (let i = 1; i <= num; i++) {
      array.push(i);
    }
    return array;
  }

  const prevClick = () => {
    let currPage = pages.currPage;
    if (currPage - 1 > 0) {
      if (pages.currPage % 5 === 1) {
        setPages({ ...pages, currPage: pages.currPage - 1, pageIdx: pages.pageIdx - 1 });
      } else {
        setPages({ ...pages, currPage: pages.currPage - 1 });
      }
    }
  };

  const nextClick = () => {
    if (pages.currPage + 1 <= pages.maxPage) {
      if (pages.currPage % 5 === 0) {
        setPages({ ...pages, currPage: pages.currPage + 1, pageIdx: pages.pageIdx + 1 });
      } else {
        setPages({ ...pages, currPage: pages.currPage + 1 });
      }
    }
  };

  const btnClick = (number) => {
    setPages({ ...pages, currPage: number });
  };

  return (
    <ul>
      <li>
        <button onClick={prevClick}>
          <ArrowBackIcon />
        </button>
      </li>
      {createArray(pages.maxPage).map((number) => (
        <>
          {number > (pages.pageIdx - 1) * 5 && number <= pages.pageIdx * 5 ? (
            <li key={number}>
              <button onClick={() => btnClick(number)}>{number}</button>
            </li>
          ) : null}
        </>
      ))}
      <li>
        <button onClick={nextClick}>
          <ArrowForwardIcon />
        </button>
      </li>
    </ul>
  );
};

export default PaginationBox;
