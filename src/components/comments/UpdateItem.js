import React, { useContext, useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'katex/dist/katex.min.css';
import './comments.scss';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import axios from 'axios';
import CommentContext from '../../contexts/CommentContext';
import { getFormData } from '../lib/api';

const UpdateItem = ({ comment, setUpdateOpened }) => {
  const { comments } = useContext(CommentContext);
  const [eValue, setEValue] = useState(comment.content);
  const [vValue, setVValue] = useState(eValue);
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

  const onUpdate = () => {
    const baseUrl = 'https://freshrimpsushi.com/dashboard/api/comments.php?action=update';
    const formData = getFormData({
      cmt_idx: comment.cmt_idx,
      content: eValue,
    });
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, formData, {});
      const data = response.data;
      const { msg } = data;
      if (msg) {
        const cmt = comments.find((cmt) => (cmt.cmt_idx === comment.cmt_idx ? true : false));
        cmt.content = eValue;
        setUpdateOpened(false);
      }
      setLoading(false);
    };
    fetchData();
  };

  return (
    <tr className="body-tr body-tr-sub">
      <td className="comment-item no-border" style={{ width: '15%' }}>
        수정하기
      </td>
      <td className="comment-item item-write" style={{ width: '80%' }}>
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
          <button onClick={() => setUpdateOpened(false)}>닫기</button>
          <button onClick={onUpdate}>확인</button>
        </div>
      </td>
    </tr>
  );
};

export const ReUpdateItem = ({ comment, updateComment, setReUpdateOpened }) => {
  const { comments } = useContext(CommentContext);
  const [eValue, setEValue] = useState(updateComment.content);
  const [vValue, setVValue] = useState(eValue);
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

  const onUpdate = () => {
    console.log(updateComment.cmt_idx);
    console.log(eValue);
    const baseUrl = 'https://freshrimpsushi.com/dashboard/api/comments.php?action=update';
    const formData = getFormData({
      cmt_idx: updateComment.cmt_idx,
      content: eValue,
    });
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, formData, {});
      const data = response.data;
      const { msg } = data;
      if (msg) {
        const cmt = comments.find((cmt) => (cmt.cmt_idx === comment.cmt_idx ? true : false));
        const child = cmt.child.find((cmt) => (cmt.cmt_idx === updateComment.cmt_idx ? true : false));
        child.content = eValue;
        setReUpdateOpened(false);
      }
      setLoading(false);
    };
    fetchData();
  };

  return (
    <tr className="body-tr body-tr-sub">
      <td className="comment-item no-border" style={{ width: '15%' }}>
        수정하기
      </td>
      <td className="comment-item item-write" style={{ width: '80%' }}>
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
          <button onClick={() => setReUpdateOpened(false)}>닫기</button>
          <button onClick={onUpdate}>확인</button>
        </div>
      </td>
    </tr>
  );
};

export default UpdateItem;
