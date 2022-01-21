import renderMathInElement from 'katex/dist/contrib/auto-render';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SubDeleteDialog } from '../CustomDialog/CustomDialog';

const SubCommentItem = ({ comments, writeOpened, setWriteOpened }) => {
  const [openedDialog, setOpenedDialog] = useState(false);
  const katexRef = useRef(null);
  useEffect(() => {
    renderMathInElement(katexRef.current, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      trust: ['\\htmlId'],
      macros: {
        '\\eqref': '\\href{###1}{(\\text{#1})}',
        '\\ref': '\\href{###1}{\\text{#1}}',
        '\\label': '\\htmlId{#1}{}',
      },
      throwOnError: false,
    });
  }, []);

  const openDialog = () => {
    setOpenedDialog(true);
  };

  return (
    <div className="sub-comment-item" ref={katexRef}>
      {comments.child.map((comment, index) => (
        <div className="sub-item" key={index}>
          <div className="info">
            <span className="author">{comment.author}</span> - <span className="datetime">{comment.datetime}</span>
            <Button className="btn btn-open" onClick={() => {}} variant="contained" startIcon={<EditIcon />} />
            <Button
              className="btn btn-delete"
              onClick={openDialog}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
          ></div>
          <SubDeleteDialog
            comment={comments}
            child={comment}
            openedDialog={openedDialog}
            setOpenedDialog={setOpenedDialog}
          />
        </div>
      ))}
      <button className="re-btn" onClick={() => setWriteOpened(!writeOpened)}>
        {!writeOpened ? '답글 작성하기' : '닫기'}
      </button>
    </div>
  );
};

export default SubCommentItem;
