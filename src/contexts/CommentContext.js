const { createContext, useState } = require('react');

const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
