import React from 'react';
import {
  Tooltip, Card, Avatar, List,
} from 'antd';
import {
  DislikeFilled, DislikeOutlined,
  LikeFilled, LikeOutlined, SettingFilled, UserOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import ToggleIcon from './chatComponents/toggleIcon';
import stringToRGB from '../../utils/colors';
import PostComments from './chatComponents/postComments';

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
  const usefullButton = (
    <Tooltip
      align={{
        offset: [0, -1],
      }}
      placement="bottom"
      title="I found this usefull"
    >
      <ToggleIcon
        baseIcon={<LikeOutlined style={{ fontSize: '20px', marginRight: 2 }} />}
        toggledIcon={<LikeFilled style={{ color: '#1677ff', fontSize: '20px', marginRight: 2 }} />}
        text={String(helpful)}
        buttonStyle={{
          fontWeight: 'bold',
          width: '100%',
          fontSize: '13px',
          border: 'none',
        }}
      />
    </Tooltip>
  );

  const unusefullButton = (
    null
  );
  const getAvatar = (usrId) => {
    const response = fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${usrId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => (
        <>
          <div style={{ gridColumn: 1 }}>
            {data.username}
          </div>
          <div style={{ gridColumn: 1 }}>
            <Avatar
              alt={data.username ? data.username[0] : ''}
              size="large"
              src={data.image}
              icon={data.image ? null : <UserOutlined />}
              style={{
                backgroundColor: stringToRGB(data.username),
                marginRight: 10,
                marginTop: 10,
              }}
            />
          </div>
        </>
      ));
  };

  return (
    <List.Item
      key={_id}
    >
      <div style={{ marginTop: 10, width: '50vw' }}>
        <Card
          bodyStyle={{ display: comments ? 'content' : 'none', backgroundColor: 'lightgrey' }}
          title={(
            <div style={{ display: 'grid' }}>
              {getAvatar(userId)}
              <div style={{
                gridColumn: 2, margin: 5, overflowWrap: 'break-word', whiteSpace: 'normal',
              }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{title}</h2>
                {content}
                <p>Tags: {tags.join(', ')}</p>
                <div>
                  {/* eslint-disable-next-line react/no-array-index-key */}
                  {postImages.map((image, index) => <img key={index} src={image} alt={`post-${_id}-${index}`} />)}
                </div>
                <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
                <p>Updated at: {new Date(updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
                    )}
          actions={[
            <SettingFilled key="setting" />,
            <SettingFilled key="edit" />,
            usefullButton, unusefullButton]}
        >
          <PostComments messages={comments} />
        </Card>
      </div>
    </List.Item>
  );
}

export default Post;
