import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeout } from 'q';
import {
  Button, Tooltip, Card, Avatar,
} from 'antd';
import {
  AimOutlined, LikeOutlined, SettingFilled, UserOutlined,
} from '@ant-design/icons';
import { setGeolocation } from '../../redux/actions/userActions';
import { reversePoint } from '../../utils/unicodeToEmoji';

function Post({
  msgID, content, userImageUrl, comments, location, isUsefull,
}) {
  const [usefull, setUsefull] = useState(isUsefull || false);
  const handleUsefullClick = () => {
    setUsefull((oldValue) => !oldValue);
  };
  useEffect(() => {
    console.log(usefull);
  }, [usefull]);
  return (
    <div style={{ marginTop: 10, maxHeight: 'fit-content', maxWidth: 'fit-content' }}>
      <Card
        bodyStyle={{ display: 'none' }}
        style={{ backgroundColor: 'rgb(200,255,200)' }}
        title={(
          <div style={{ display: 'grid' }}>
            <div style={{ gridColumn: 1 }}>
              <Avatar
                size="large"
                src={userImageUrl}
                icon={userImageUrl ? null : <UserOutlined />}
                style={{ marginRight: 10, marginTop: 10 }}
              />
            </div>
            <div style={{
              gridColumn: 2, margin: 5, overflowWrap: 'break-word', whiteSpace: 'normal',
            }}
            >
              {content}
            </div>
          </div>
)}
        actions={[
          <SettingFilled key="setting" />,
          <SettingFilled key="edit" />,
          <Button
            onClick={handleUsefullClick}
            style={{
              fontWeight: 'bold',
              //   color: ('rgb(52,119,255)'),
              display: 'block',
              width: '100%',
              border: 'none',
              fontSize: '13px',
            }}
          >
            <LikeOutlined key="ellipsis" style={{ fontSize: '20px', marginRight: 2 }} />
            Usefull
          </Button>,

        ]}
      />
    </div>
  );
}

export default Post;
