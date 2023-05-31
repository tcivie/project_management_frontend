import {
  Tooltip, Card, Avatar, List,
} from 'antd';
import {
  DislikeFilled, DislikeOutlined,
  LikeFilled, LikeOutlined, SettingFilled, UserOutlined,
} from '@ant-design/icons';
import ToggleIcon from './chatComponents/toggleIcon';
import stringToRGB from '../../utils/colors';

function Post({
  msgID, username, content, userImageUrl, comments,
}) {
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
        text="30"
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
    <Tooltip
      align={{
        offset: [0, -1],
      }}
      placement="bottom"
      title="I didn't find this usefull"
    >
      <ToggleIcon
        baseIcon={<DislikeOutlined style={{ fontSize: '20px', marginRight: 2 }} />}
        toggledIcon={<DislikeFilled style={{ color: '#1677ff', fontSize: '20px', marginRight: 2 }} />}
        text="30"
        buttonStyle={{
          fontWeight: 'bold',
          width: '100%',
          fontSize: '13px',
          border: 'none',
        }}
      />
    </Tooltip>

  );
  return (
    <List.Item
      key={msgID}

    >
      <div style={{ marginTop: 10, width: '50vw' }}>
        <Card
          bodyStyle={{ display: comments ? 'flex' : 'none' }}
          title={(
            <div style={{ display: 'grid' }}>
              <div style={{ gridColumn: 1 }}>
                {username}
              </div>
              <div style={{ gridColumn: 1 }}>
                <Avatar
                  alt={username ? username[0] : ''}
                  size="large"
                  src={userImageUrl}
                  icon={userImageUrl ? null : <UserOutlined />}
                  style={{ backgroundColor: stringToRGB(username), marginRight: 10, marginTop: 10 }}
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
            usefullButton, unusefullButton]}
        />
      </div>
    </List.Item>
  );
}

export default Post;
