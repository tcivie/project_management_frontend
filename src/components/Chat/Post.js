import React, { useEffect, useState } from 'react';
import {
  Avatar, List, Space, Tag, Button, Image, Carousel,
} from 'antd';
import {
  LikeOutlined, MessageOutlined, SaveFilled, SaveOutlined, UserOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import DOMPurify from 'dompurify'; // to sanitize html
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import stringToRGB from '../../utils/colors';
import ActionButtons from './chatComponents/ActionButtons';
import InnerPostChat from './chatComponents/InnerPostChat';

const useUser = (usrId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${usrId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [usrId]);

  return user;
};

const getImages = (postImages) =>
// eslint-disable-next-line array-callback-return,implicit-arrow-linebreak
  postImages.map((image) => (
    <div>
      <Image
        src={`${process.env.REACT_APP_API_SERVER}/api/images/postImage/${encodeURIComponent(image)}`}
        alt={image}
        style={{
          width: '500px',
          height: 'auto',
          maxHeight: '500px',
          objectFit: 'contain',
          marginBottom: '10px',
        }}
      />
    </div>
  ));
function Post({ data }) {
  const {
    setHelpful, owner, post, setSaved,
  } = data;
  const {
    _id,
    title,
    content,
    userId,
    tags,
    postImages,
    comments,
    helpful,
    saves,
    createdAt,
    updatedAt,
  } = post;
  const [showRepliesModal, setRepliesModalVisbility] = useState(false);
  const handleCommentsClick = () => {
    setRepliesModalVisbility(true);
  };
  const closeComments = () => {
    setRepliesModalVisbility(false);
  };
  const repliesModal = (
    <InnerPostChat
      title={title}
      postid={_id}
      onClose={closeComments}
      isOpen={showRepliesModal}
    />
  );
  const sanitizedHTML = DOMPurify.sanitize(content);
  const images = getImages(postImages);
  const user = useUser(userId);
  console.log(post);
  return (
    <List.Item
      key={_id}
      actions={[
        <ActionButtons type="save" postId={_id} setSaved={setSaved} value={saves.length} />,
        <ActionButtons type="helpful" postId={_id} setHelpful={setHelpful} value={helpful.length} />,
        <Button type="text" onClick={handleCommentsClick} icon={<MessageOutlined />}> {comments} </Button>,
        // eslint-disable-next-line max-len
        <p>Created at: {new Date(createdAt).toLocaleDateString()} | Updated at: {new Date(updatedAt).toLocaleDateString()}</p>,
      ]}
      extra={(
        <Image.PreviewGroup>
          {images}
        </Image.PreviewGroup>
        )}
      style={{
        border: '1px solid #e8e8e8',
        borderRadius: '5px',
        marginBottom: '20px',
        padding: '20px',
        maxHeight: '500px',
        overflowY: 'scroll',
        backgroundColor: '#f0f2f5',
        paddingRight: '20px',
      }}
    >
      {repliesModal}
      <List.Item.Meta
        avatar={
              user ? (
                <Avatar
                  alt={user.username ? user.username[0] : ''}
                  size="large"
                  src={user?.avatar}
                  icon={user?.avatar ? null : <UserOutlined />}
                  style={{
                    backgroundColor: stringToRGB(user.username),
                    marginRight: 10,
                    marginTop: 10,
                  }}
                >
                  {user.username ? user.username[0] : ''}
                </Avatar>
              ) : (
                <SkeletonAvatar />
              )
          }
        title={<h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{title}</h2>}
        description={(
          <div>
            <div
              style={{ fontSize: '15px', fontWeight: 'normal', marginBottom: '20px' }}
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
            {tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
)}
      />
      {/* <PostComments messages={comments} /> */}
    </List.Item>
  );
}

export default Post;
