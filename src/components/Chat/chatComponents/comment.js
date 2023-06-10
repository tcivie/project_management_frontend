import { UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Input, List,
} from 'antd';
import { useState } from 'react';
import stringToRGB from '../../../utils/colors';

export default function PostComment({ message }) {
  const [editMode, SetEditMode] = useState(false);
  const ToggleEdit = () => {
    SetEditMode((oldVal) => !oldVal);
  };
  return (
    <List.Item
      key={message._id}
    >
      {/* <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Avatar
          alt={username ? username[0] : ''}
          size="large"
          src={userImageUrl}
          icon={userImageUrl ? null : <UserOutlined />}
          style={{
            flex: 'none', backgroundColor: stringToRGB(username), marginRight: 10, marginTop: 10,
          }}
        />
        <Input.TextArea
          autoSize
          readOnly={!editMode}
          style={{
            backgroundColor: editMode ? 'white' : 'lightgray',
            resize: 'none',
            overflow: 'hidden',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            maxWidth: '40vw',
          }}
          bordered={editMode}
          defaultValue={message.content}
        />
      </div>
      <Button onClick={ToggleEdit} /> */}
      <div>
        <Input.TextArea
          autoSize
          readOnly={!editMode}
          style={{
            backgroundColor: editMode ? 'white' : 'lightgray',
            resize: 'none',
            overflow: 'hidden',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            maxWidth: '40vw',
          }}
          bordered={editMode}
          defaultValue={message.content}
        />
      </div>
    </List.Item>
  );
}
