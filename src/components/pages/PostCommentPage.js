import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
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
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setComments } = useContext(CommentContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.userId && !auth.isLogin) {
      navigate('/login');
    }
  }, [auth, navigate]);

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

  return (
    <div className="post-comment-page">
      <table>
        <thead className="thead-box">
          <HeaderBox headData={headData} colScope={colScope} />
        </thead>
        <tbody className="tbody-box">
          {loading ? (
            <tr>
              <td>로딩중</td>
            </tr>
          ) : (
            <BodyBox colScope={colScope} />
          )}
        </tbody>
      </table>
      <div className="footer-box">
        <PaginationBox />
      </div>
    </div>
  );
};

export default PostCommentPage;
