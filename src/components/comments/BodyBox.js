import React from 'react';
import './comments.scss';

const CommentItem = ({ index, comment, colScope }) => {
  return (
    <div className="comment-body">
      <div className="comment-item" style={{ width: colScope[0] }}>
        {index}
      </div>
      <div className="comment-item" style={{ width: colScope[1] }}>
        {comment.author}
      </div>
      <div className="comment-item content" style={{ width: colScope[2] }}>
        {comment.content}
      </div>
      <div className="comment-item" style={{ width: colScope[3] }}>
        {comment.board_title}
      </div>
      <div className="comment-item" style={{ width: colScope[4] }}>
        {comment.datetime}
      </div>
      <div className="comment-item" style={{ width: colScope[5] }}>
        <button>이동</button>
      </div>
    </div>
  );
};

const BodyBox = ({ comments, colScope }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          index={index}
          comment={comment}
          colScope={colScope}
        />
      ))}
    </>
  );
};

export default BodyBox;
