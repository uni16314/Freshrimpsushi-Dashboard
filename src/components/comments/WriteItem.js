import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './comments.scss';
import renderMathInElement from 'katex/dist/contrib/auto-render';

const WriteItem = ({ comment, colScope }) => {
  const [eValue, setEValue] = useState('');
  const [vValue, setVValue] = useState('');
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
    const { value, name } = e.target;
    console.log(value);
    setEValue(value);
    setVValue(value);
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
            <pre ref={vRef}>{vValue}</pre>
          </div>
        </div>
        <div className="md-btn">
          <button>확인</button>
        </div>
      </td>
    </tr>
  );
};

export default WriteItem;
