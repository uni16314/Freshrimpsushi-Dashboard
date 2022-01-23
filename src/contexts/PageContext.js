const { createContext, useState } = require('react');

const PageContext = createContext();

export const PageContextProvider = ({ children }) => {
  const [pages, setPages] = useState({
    currPage: 1,
    cmtPerPage: 4,
    maxPage: 0,
    pageIdx: 1,
  });

  return (
    <PageContext.Provider value={{ pages, setPages }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
