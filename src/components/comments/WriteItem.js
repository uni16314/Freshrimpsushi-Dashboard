import React, { useContext, useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'katex/dist/katex.min.css';
import './comments.scss';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import axios from 'axios';
import { getFormData } from '../lib/api';
import AuthContext from '../../contexts/AuthContext';
import CommentContext from '../../contexts/CommentContext';

const WriteItem = ({ comment, setWriteOpened }) => {
  const { auth } = useContext(AuthContext);
  const { comments, setComments } = useContext(CommentContext);
  const [eValue, setEValue] = useState('');
  const [vValue, setVValue] = useState('');
  const [loading, setLoading] = useState(false);
  const vRef = useRef(null);

  useEffect(() => {
    renderMathInElement(vRef.current, {
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
  }, [eValue]);

  const handleChange = (e) => {
    const { value } = e.target;
    setEValue(value);
    setVValue(value);
  };

  const onReply = () => {
    const baseUrl = 'https://freshrimpsushi.com/dashboard/api/comments.php?action=reply';
    const formData = getFormData({
      cmt_idx: comment.cmt_idx,
      admin_id: auth.userId,
      content: vValue,
    });
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, formData, {});
      const data = response.data;
      const { msg, rows } = data;
      if (msg) {
        const cmt = comments.find((cmt) => (cmt.cmt_idx === comment.cmt_idx ? true : false));
        cmt.child.push(rows);
        cmt.child_cnt++;
        // const commentNext = [...comments];
        // const cmt = commentNext.find((cmt) => (cmt.cmt_idx === comment.cmt_idx ? true : false));
        // cmt.child.push(rows);
        // cmt.child_cnt++;
        // console.log(comments);
        // console.log(commentNext);
        // const commentNext = comments.find((cmt) => (cmt.cmt_idx === comment.cmt_idx ? true : false));
        // commentNext.child.push(rows);
        // commentNext.child_cnt++;
        // console.log(commentNext);
        // console.log(comments);

        // setComments(commentNext);
        setWriteOpened(false);
      }
      setLoading(false);
    };
    fetchData();
  };

  return (
    <tr className="body-tr body-tr-sub">
      <td className="comment-item no-border" style={{ width: '15%' }}></td>
      <td className="comment-item item-write" style={{ width: '70%' }}>
        <div className="editor">
          <textarea
            className="md-editor"
            name="editor"
            value={eValue}
            onChange={handleChange}
            wrap="off"
            placeholder="댓글을 작성하세요..."
          />
          <div className="md-viewer">
            <div
              ref={vRef}
              dangerouslySetInnerHTML={{
                __html: vValue,
              }}
            />
          </div>
        </div>
        <div className="md-btn">
          <button onClick={onReply}>확인</button>
        </div>
      </td>
    </tr>
  );
};

export default WriteItem;
