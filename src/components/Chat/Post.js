import React, { useState } from 'react';
import {
  Avatar, List, Space, Tag, Button, Image, Carousel,
} from 'antd';
import {
  LikeOutlined, MessageOutlined, SaveOutlined, UserOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import DOMPurify from 'dompurify'; // to sanitize html
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import stringToRGB from '../../utils/colors';

const getAvatar = (usrId) => {
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
      if (data?.username) {
        return (
          <Avatar
            alt={data.username ? data.username[0] : ''}
            size="large"
            src={data?.avatar}
            icon={data?.avatar ? null : <UserOutlined />}
            style={{
              backgroundColor: stringToRGB(data.username),
              marginRight: 10,
              marginTop: 10,
            }}
          >
            {data.username ? data.username[0] : ''}
          </Avatar>
        );
      }
      return (
        <SkeletonAvatar />
      );
    });
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
function Post(
  post,
) {
  const {
    _id,
    title,
    content,
    userId,
    tags,
    postImages,
    comments,
    helpful,
    createdAt,
    updatedAt,
  } = post;
  const sanitizedHTML = DOMPurify.sanitize(content);
  const images = getImages(postImages);

  return (
    <List.Item
      key={_id}
      actions={[
        <Button type="text" icon={<SaveOutlined />}> 150 </Button>,
        <Button type="text" icon={<LikeOutlined />}> {helpful} </Button>,
        <Button type="text" icon={<MessageOutlined />}> {comments} </Button>,
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
      <List.Item.Meta
        avatar={getAvatar(userId)}
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
