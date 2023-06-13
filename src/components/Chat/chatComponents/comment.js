import { Avatar, Input, List } from 'antd';
import stringToRGB from '../../../utils/colors';

export default function PostComment({ message }) {
  const messageUser = message.user;
  const messageId = message._id;

  // Assume the date is in ISO format, we format it to a human readable string
  const createdAt = new Date(message.createdAt).toLocaleString();

  return (
    <List.Item key={messageId}>
      <List.Item.Meta
        avatar={(
          <Avatar
            src={messageUser?.avatar}
            style={{
              backgroundColor: stringToRGB(messageUser?.nickname || 'Anonymous'),
              marginRight: 10,
              marginTop: 10,
            }}
          />
                )}
        title={messageUser?.nickname || 'Anonymous'}
        description={createdAt}
      />
      <div>
        <Input.TextArea
          autoSize
          readOnly
          hoverable={false}
          style={{
            backgroundColor: 'lightgray',
            resize: 'none',
            overflow: 'hidden',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            maxWidth: '40vw',
          }}
          defaultValue={message.content}
        />
      </div>
    </List.Item>
  );
}
