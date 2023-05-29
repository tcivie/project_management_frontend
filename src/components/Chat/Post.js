import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeout } from 'q';
import {
  Button, Tooltip, Card, Avatar, List,
} from 'antd';
import {
  AimOutlined, LikeFilled, LikeOutlined, SettingFilled, UserOutlined,
} from '@ant-design/icons';
import { setGeolocation } from '../../redux/actions/userActions';
import { reversePoint } from '../../utils/unicodeToEmoji';
import ToggleIcon from './chatComponents/toggleIcon';

function Post({
  msgID, content, userImageUrl, comments, location, isUsefull,
}) {
  const usefullButton = (
    <ToggleIcon
      baseIcon={<LikeOutlined style={{ fontSize: '20px', marginRight: 2 }} />}
      toggledIcon={<LikeFilled style={{ color: '#1677ff', fontSize: '20px', marginRight: 2 }} />}
      text="Usefull"
      buttonStyle={{
        fontWeight: 'bold',
        //   color: ('rgb(52,119,255)'),
        display: 'block',
        width: '100%',
        border: 'none',
        fontSize: '13px',
      }}
    />
  );
  return (
    <List.Item
      key={msgID}
      style={{ marginTop: 10, justifyContent: 'center' }}
      actions={[
        <SettingFilled key="setting" />,
        <SettingFilled key="edit" />,
        usefullButton,
      ]}
    >
      <div style={{ marginTop: 10, width: '40vw' }}>
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

        />
      </div>
    </List.Item>
  );
}

export default Post;
