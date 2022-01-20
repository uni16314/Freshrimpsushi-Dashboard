import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import './comments.scss';
import { DeleteDialog } from '../CustomDialog/CustomDialog';
import CommentContext from '../../contexts/CommentContext';

function checkString(str, length) {
  return str.length >= length;
}

const CommentItem = ({ index, comment, colScope }) => {
  const [readMore, setReadMore] = useState(false);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const katexRef = useRef(null);

  const gotoBtn = () => {
    const openLink = `https://freshrimpsushi.github.io/posts/${comment.board_slug}#comment${comment.cmt_idx}`;
    window.open(openLink, '_blank');
  };

  const openDialog = () => {
    setOpenedDialog(true);
  };

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
  }, [readMore]);

  return (
    <>
      <tr className="body-tr">
        <td className="comment-item" style={{ width: colScope[0] }}>
          {index + 1}
        </td>
        <td className="comment-item" style={{ width: colScope[1] }}>
          {comment.author}
        </td>
        <td className="comment-item p20" style={{ width: colScope[2] }} ref={katexRef}>
          <div
            dangerouslySetInnerHTML={{
              __html: readMore
                ? comment.content
                : checkString(comment.content, 120)
                ? `${comment.content.substring(0, 120)}...`
                : comment.content,
            }}
          />
          {checkString(comment.content, 120) ? (
            <button className="more-btn" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Show less' : 'Read more'}
            </button>
          ) : null}
        </td>
        <td className="comment-item" style={{ width: colScope[3] }}>
          {comment.board_title}
        </td>
        <td className="comment-item p20" style={{ width: colScope[4] }}>
          {comment.datetime}
        </td>
        <td className="comment-item" style={{ width: colScope[5] }}>
          <div className="item-tools">
            <div className="item-tools-top">
              <Button
                className="btn btn-delete"
                onClick={openDialog}
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              />
              <Button className="btn btn-open" onClick={gotoBtn} variant="contained" startIcon={<LinkIcon />} />
            </div>
            <div className="item-tools-bottom">
              <Button className="btn btn-open" onClick={() => {}} variant="outline" startIcon={<EditIcon />}>
                수정
              </Button>
            </div>
          </div>
          <DeleteDialog comment={comment} openedDialog={openedDialog} setOpenedDialog={setOpenedDialog} />
        </td>
      </tr>
    </>
  );
};

const BodyBox = ({ colScope }) => {
  const { comments } = useContext(CommentContext);
  return (
    <>
      {comments.map((comment, index) => (
        <CommentItem key={index} index={index} comment={comment} colScope={colScope} />
      ))}
    </>
  );
};

export default BodyBox;
