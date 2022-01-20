import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { getFormData } from '../lib/api';
import CommentContext from '../../contexts/CommentContext';

export const DeleteDialog = ({ comment, openedDialog, setOpenedDialog }) => {
  const { comments, setComments } = useContext(CommentContext);
  const [loading, setLoading] = useState(false);
  const closeBtn = () => {
    setOpenedDialog(false);
  };

  const deleteBtn = () => {
    const baseUrl = 'https://freshrimpsushi.com/dashboard/api/comments.php?action=deleteComment';
    const formData = getFormData({
      cmt_idx: comment.cmt_idx,
    });
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post(baseUrl, formData, {});
      const msg = response.data.msg;
      if (msg) {
        console.log('삭제완료');
        const commentsNext = comments.filter(function (cmt) {
          if (cmt.cmt_idx === comment.cmt_idx) {
            return false;
          }
          if (cmt.parent_cmt_idx === comment.cmt_idx) {
            return false;
          }
          return true;
        });
        setComments(commentsNext);
      }
      setLoading(false);
    };
    fetchData();
    setOpenedDialog(false);
  };

  return (
    <Dialog
      open={openedDialog}
      onClose={closeBtn}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">경고</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">정말 삭제하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeBtn}>취소</Button>
        <Button onClick={deleteBtn} autoFocus variant="contained" color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};
