import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import './comments.scss';
import { DeleteDialog } from '../CustomDialog/CustomDialog';
import CommentContext from '../../contexts/CommentContext';
import WriteItem from './WriteItem';
import SubCommentItem from './SubCommentItem';
import PageContext from '../../contexts/PageContext';

export function checkString(str, length) {
  return str.length >= length;
}

const CommentItem = ({ index, comment, colScope }) => {
  const [readMore, setReadMore] = useState(false);
  const [subOpened, setSubOpened] = useState(false);
  const [writeOpened, setWriteOpened] = useState(false);
  const [updateOpened, setUpdateOpened] = useState(false);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const katexRef = useRef(null);
  const { pages } = useContext(PageContext);

  const gotoBtn = () => {
    const openLink = `https://freshrimpsushi.github.io/posts/${comment.board_slug}#comment${comment.cmt_idx}`;
    window.open(openLink, '_blank');
  };

  const openDialog = () => {
    setOpenedDialog(true);
  };

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, [readMore, pages.currPage]);

  if (loading) {
    return (
      <tr className="body-tr">
        <td>로딩중</td>
      </tr>
    );
  }

  return (
    <>
      <tr className="body-tr">
        <td className="comment-item" style={{ width: colScope[0] }}>
          {index + 1}
        </td>
        <td className="comment-item" style={{ width: colScope[1] }}>
          {comment.author}
        </td>
        <td className="comment-item p20" style={{ width: colScope[2] }}>
          <div
            ref={katexRef}
            dangerouslySetInnerHTML={{
              __html: readMore
                ? comment.content
                : checkString(comment.content, 120)
                ? `${comment.content.substring(0, 120)}...`
                : comment.content,
            }}
          />
          {checkString(comment.content, 120) ? (
            <div className="more-btn" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'show less' : 'read more'}
            </div>
          ) : null}

          {comment.child_cnt > 0 ? (
            <>
              {subOpened ? (
                <>
                  <div
                    className="sub-open"
                    onClick={() => {
                      setSubOpened(!subOpened);
                      setWriteOpened(false);
                    }}
                  >
                    <RemoveIcon />
                    <span>숨기기</span>
                  </div>
                  <SubCommentItem comments={comment} writeOpened={writeOpened} setWriteOpened={setWriteOpened} />
                </>
              ) : (
                <div className="sub-open" onClick={() => setSubOpened(!subOpened)}>
                  <AddIcon />
                  <span>{comment.child_cnt}개의 답글</span>
                </div>
              )}
            </>
          ) : (
            <div
              className="sub-open"
              onClick={() => {
                setWriteOpened(!writeOpened);
                setSubOpened(!subOpened);
              }}
            >
              <AddIcon />
              <span>답글 달기</span>
            </div>
          )}
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
              <Button
                className="btn btn-open"
                onClick={() => setUpdateOpened(!updateOpened)}
                variant="outline"
                startIcon={<EditIcon />}
              >
                수정
              </Button>
            </div>
          </div>
          <DeleteDialog comment={comment} openedDialog={openedDialog} setOpenedDialog={setOpenedDialog} />
        </td>
      </tr>
      {writeOpened ? <WriteItem comment={comment} setWriteOpened={setWriteOpened} /> : null}
      {/* {updateOpened ? <WriteItem comment={comment} setUpdateOpened={setUpdateOpened} /> : null} */}
    </>
  );
};

const BodyBox = ({ colScope }) => {
  const { comments } = useContext(CommentContext);
  const { pages } = useContext(PageContext);

  const indexOfLast = pages.currPage * pages.cmtPerPage;
  const indexOfFirst = indexOfLast - pages.cmtPerPage;
  function currentComment(cmt) {
    let currComments = 0;
    currComments = cmt.slice(indexOfFirst, indexOfLast);
    return currComments;
  }

  return (
    <>
      {currentComment(comments).map((comment, index) => (
        <CommentItem
          key={index}
          index={(pages.currPage - 1) * pages.cmtPerPage + index}
          comment={comment}
          colScope={colScope}
        />
      ))}
    </>
  );
};

export default BodyBox;
