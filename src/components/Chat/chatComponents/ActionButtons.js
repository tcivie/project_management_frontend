import {
  EditOutlined,
  LikeFilled, LikeOutlined, SaveFilled, SaveOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import addMessage, { setMessage } from '../../../redux/actions/messageActions';
import {
  userLiked, userSaved, userUnLiked, userUnSaved,
} from '../../../redux/actions/postAction';
import PostEditor from './PostEditor';
// import Poster from '../Poster';

function ActionButtons({
  type, postId, setHelpful = false, owner = false, setSaved = false, value = 0,
}) {
  const [savedClicked, setSavedClicked] = useState(setSaved);
  const [helpfulClicked, setHelpfulClicked] = useState(setHelpful);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const [contentValue, setContentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const userId = userSelector.userData.id;
  switch (type) {
    case 'save':
      return (
        <Button
          type="text"
          icon={savedClicked ? <SaveFilled /> : <SaveOutlined />}
          onClick={() => {
            let action = 'savePost';
            if (savedClicked) action = 'unSavePost';
            fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${action}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
              body: JSON.stringify({ postId, userId }),
              credentials: 'include',
            })
              .then((res) => {
                if (res.ok) {
                  setContentValue(savedClicked ? contentValue - 1 : contentValue + 1);
                  setSavedClicked(!savedClicked);
                  dispatch(savedClicked
                    ? userSaved(userSelector.userData.id)
                    : userUnSaved(userSelector.userData.id));
                  dispatch(setMessage('success', !savedClicked ? 'Saved!' : 'Unsaved!'));
                } else {
                  dispatch(setMessage('error', 'Something went wrong 😟'));
                }
              });
          }}
        >
          {contentValue}
        </Button>
      );
    case 'helpful':
      return (
        <Button
          type="text"
          icon={helpfulClicked ? <LikeFilled /> : <LikeOutlined />}
          onClick={() => {
            let action = 'setHelpful';
            if (helpfulClicked) action = 'unsetHelpful';
            fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/post/${action}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
              body: JSON.stringify({ postId, userId }),
              credentials: 'include',
            })
              .then((res) => {
                if (res.ok) {
                  setContentValue(helpfulClicked ? contentValue - 1 : contentValue + 1);
                  setHelpfulClicked(!helpfulClicked);
                  dispatch(helpfulClicked
                    ? userLiked(userSelector.userData.id)
                    : userUnLiked(userSelector.userData.id));
                  dispatch(setMessage('success', !helpfulClicked ? 'Marked as helpful!' : 'Unmarked as helpful!'));
                } else {
                  dispatch(setMessage('error', 'Something went wrong 😟'));
                }
              });
          }}
        >
          {contentValue}
        </Button>
      );
    case 'edit': // TODO: Add edit button
      return owner ? (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          {isEditing && <PostEditor postId={postId} onClose={() => setIsEditing(false)} />}
        </>
      ) : (
        null
      );
    default:
      break;
  }
}

export default ActionButtons;
