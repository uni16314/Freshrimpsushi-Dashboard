import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const colScope = ['5%', '10%', '45%', '20%', '10%', '10%'];

const PostCommentPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseUrl =
      'https://freshrimpsushi.com/dashboard/api/comments.php?action=getPostComments';
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, null, {});
      const rows = response.data.rows;
      setComments(rows);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="post-comment-page">
      <div className="header-box">
        <HeaderBox headData={headData} colScope={colScope} />
      </div>
      <div className="body-box">
        <BodyBox colScope={colScope} comments={comments} />
      </div>
      <div className="footer-box">
        <PaginationBox />
      </div>
    </div>
  );
};

export default PostCommentPage;
