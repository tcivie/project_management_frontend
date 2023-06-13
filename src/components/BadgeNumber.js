import { useEffect, useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Button, Badge, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import unicodeToEmoji from '../utils/unicodeToEmoji';

export function ActiveUsersBadgeChatRooms({ item }) {
  const [activeUsers, setActiveUsers] = useState(0);
  const navigate = useNavigate();

  const fetchActiveUsers = async () => {
    try {
      fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/active-users/city/${item.id}/${item.key}`, {
        method: 'GET',
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return [];
      }).then((data) => {
        setActiveUsers(data);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Badge.Ribbon
      color="volcano"
      text={<> <TeamOutlined /> {activeUsers} </>}
      status="processing"
      style={{ right: '0px', top: '-10px' }}
    >
      <List.Item>
        <Button type="primary" block onClick={() => { navigate(`/chat?cid=${item.id}&lang=${item.key}`); }}>
          <div style={{ float: 'left' }}>
            {item?.nameInEnglish} {unicodeToEmoji(item?.emoji)} {item?.nameInNative}
          </div>
        </Button>
      </List.Item>
    </Badge.Ribbon>
  );
}

export function ActiveUsersBadgeNearbyCities({ item, onClick }) {
  const [activeUsers, setActiveUsers] = useState(0);

  const fetchActiveUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/active-users/city/${item.id}`);
      setActiveUsers(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  return (
    <Badge.Ribbon
      color="volcano"
      text={<> <TeamOutlined /> {activeUsers} </>}
      status="processing"
      style={{ right: '-6px', top: '-10px' }}
    >
      <List.Item>
        <Button type="primary" block onClick={onClick}>
          <div style={{ float: 'left' }}>
            {item.name} {item.country}
          </div>
        </Button>
      </List.Item>
    </Badge.Ribbon>
  );
}

export default { ActiveUsersBadgeChatRooms, ActiveUsersBadgeNearbyCities };
