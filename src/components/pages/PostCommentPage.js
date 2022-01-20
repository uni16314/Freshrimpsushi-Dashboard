import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CommentContext from '../../contexts/CommentContext';
import BodyBox from '../comments/BodyBox';
import HeaderBox from '../comments/HeaderBox';
import PaginationBox from '../comments/PaginationBox';
import './PostCommentPage.scss';

const headData = [
  { idx: 1, title: '순번' },
  { idx: 2, title: '작성자' },
  { idx: 3, title: '내용' },
  { idx: 4, title: '글제목' },
  { idx: 5, title: '작성일자' },
  { idx: 6, title: '바로이동' },
];

const colScope = ['5%', '10%', '45%', '15%', '10%', '15%'];

const PostCommentPage = () => {
  const { setComments } = useContext(CommentContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseUrl = 'https://freshrimpsushi.com/dashboard/api/comments.php?action=getPostComments';
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, null, {});
      const rows = response.data.rows;
      setComments(rows);
      setLoading(false);
    };
    fetchData();
    return setComments([]);
  }, [setComments]);

  // if (loading) {
  //   return (
  //     <div className="post-comment-page">
  //       <div className="header-box">
  //         <HeaderBox headData={headData} colScope={colScope} />
  //       </div>
  //       <div className="body-box">로딩중...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="post-comment-page">
      <table>
        <thead className="thead-box">
          <HeaderBox headData={headData} colScope={colScope} />
        </thead>
        <tbody className="tbody-box">{loading ? <p>로딩중</p> : <BodyBox colScope={colScope} />}</tbody>
      </table>
      <div className="footer-box">
        페이지네이션
        {/* <PaginationBox /> */}
      </div>
    </div>
  );
};

export default PostCommentPage;
