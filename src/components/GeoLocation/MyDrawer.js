// MyDrawer.js
import { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  Divider,
  Typography,
  Skeleton, Row, Col, Button, Avatar, Tag,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import markerClick, { drawerClose } from '../../redux/actions/drawerActions';
import OGCard from '../OGCard';
import { ActiveUsersBadgeChatRooms, ActiveUsersBadgeNearbyCities } from '../BadgeNumber';
import stringToRGB from '../../utils/colors';
import ActionButtons from '../Chat/chatComponents/ActionButtons';
import InnerPostChat from '../Chat/chatComponents/InnerPostChat';

function MyDrawer() {
  const drawerReducer = useSelector((state) => state.drawer);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showRepliesModal, setRepliesModalVisbility] = useState(false);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, visible,
  } = drawerReducer; const dispatch = useDispatch();
  let chatRoomInfoParsed = [];
  if (chatRoomInfo !== null) {
    chatRoomInfoParsed = Object.keys(chatRoomInfo).map((key) => {
      const item = chatRoomInfo[key];
      return {
        key,
        ...item,
        ...locationInfo,
      };
    });
  }

  const handleCommentsClick = () => {
    setRepliesModalVisbility(true);
  };

  const closeComments = () => {
    setRepliesModalVisbility(false);
  };

  const fetchPosts = async () => {
    const page = 1; // Or whatever page you want to load
    const count = 10; // Number of posts per page
    const cityId = locationInfo?.id;
    const url = `${process.env.REACT_APP_API_SERVER}/api/chat/posts/latest/${page}/${count}/${cityId}/all`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      credentials: 'include',
    });
    const data = await response.json();

    const sortedData = data.sort((a, b) => {
      const helpfulDiff = b.helpful.length - a.helpful.length;
      if (helpfulDiff !== 0) return helpfulDiff;

      const commentsDiff = b.comments.length - a.comments.length;
      if (commentsDiff !== 0) return commentsDiff;

      return b.saves.length - a.saves.length;
    });

    setPosts(sortedData);
  };

  const fetchUser = async (userId) => {
    const url = `${process.env.REACT_APP_API_SERVER}/api/users/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (visible) {
      fetchPosts();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && posts.length > 0) {
      const fetchAllUsers = async () => {
        const usersData = await Promise.all(posts.map(async (post) => {
          const userData = await fetchUser(post.userId);
          return { ...userData, id: post.userId };
        }));
        setUsers(usersData);
      };
      fetchAllUsers();
    }
  }, [visible, posts]);

  if (isUserMarker) {
    return (
      <Drawer
        title="Your Location"
        placement="right"
        closable
        onClose={() => dispatch(drawerClose())}
        visible={visible}
        size="small"
      />
    );
  }

  return (
    <Drawer
      placement="right"
      closable
      onClose={() => dispatch(drawerClose())}
      visible={visible}
      width="50%"
    >
      <OGCard wikiId={locationInfo?.wikiDataId} />
      <Divider style={{ margin: '6px' }}> Chat Rooms
      </Divider>
      <div
        style={{
          height: '120px',
          overflow: 'auto',
          padding: '20px 20px',
          border: '1px solid #e8e8e8',
        }}
      >
        <List
          dataSource={chatRoomInfoParsed}
          grid={{ gutter: 16, column: 3 }}
          renderItem={(item) => <ActiveUsersBadgeChatRooms item={item} />}
        />
      </div>
      <Row gutter={32}>
        <Col span={12}>
          <Divider> Nearby Cities </Divider>
          <div
            style={{
              height: '45vh',
              overflow: 'auto',
              padding: '20px 20px',
              border: '1px solid #e8e8e8',
            }}
          >
            <List
              dataSource={nearbyCities || []}
              grid={{ gutter: 16, column: 1 }}
              renderItem={(item) => (
                locationInfo?.name !== item.name && (
                  <ActiveUsersBadgeNearbyCities
                    item={item}
                    onClick={() => dispatch(markerClick({ payload: [item] }))}
                  />
                )
              )}
            />
          </div>
        </Col>
        <Col span={12}>
          <Divider> Trending Topics </Divider>
          <div
            style={{
              height: '45vh',
              overflow: 'auto',
              padding: '8px 8px',
              border: '1px solid #e8e8e8',
            }}
          >
            {posts.length ? (
              <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post) => {
                  // eslint-disable-next-line no-shadow
                  const user = users.find((user) => user.id === post.userId);
                  return (
                    <List.Item
                      key={post._id}
                      actions={[
                        <ActionButtons type="save" postId={post._id} setSaved={post.setSaved} size="small" value={post.saves.length} />,
                        <ActionButtons type="helpful" postId={post._id} setHelpful={post.setHelpful} size="small" value={post.helpful.length} />,
                        <Button type="text" size="small" onClick={handleCommentsClick} icon={<MessageOutlined />}>{post.comments}</Button>,
                        <ActionButtons type="edit" postId={post._id} owner={post.owner} size="small" />,
                        <Typography.Text type="secondary">Created at: {new Date(post.createdAt).toLocaleDateString()} | Updated at: {new Date(post.updatedAt).toLocaleDateString()}</Typography.Text>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                        user ? (
                          <Avatar
                            alt={user.username ? user.username[0] : ''}
                            size="small" // adjust avatar size
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
                          <SkeletonAvatar size="small" />
                        )
                      }
                        title={<h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.title}</h2>}
                        description={(
                          <>
                            <div
                              style={{
                                fontSize: '12px', fontWeight: 'normal', marginBottom: '10px',
                              }}
                                /* eslint-disable-next-line react/no-danger */
                              dangerouslySetInnerHTML={{ __html: `${post.content.slice(0, 100)}...` }}
                            />
                            {post.tags.map((tag) => (
                              <Tag key={tag} color="blue" style={{ fontSize: '10px' }}>
                                {tag}
                              </Tag>
                            ))}
                          </>
                        )}
                      />
                      <InnerPostChat
                        title={post.title}
                        postId={post._id}
                        onClose={closeComments}
                        isOpen={showRepliesModal}
                      />
                    </List.Item>
                  );
                }}
              />
            ) : (
              <Skeleton active />
            )}
          </div>
        </Col>
      </Row>
    </Drawer>
  );
}

export default MyDrawer;
