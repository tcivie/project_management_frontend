import {
  Input, List,
} from 'antd';

export default function PostComment({ message }) {
  // eslint-disable-next-line no-underscore-dangle
  const messageId = message._id;
  return (
    <List.Item
      key={messageId}
    >
      <div>
        <Input.TextArea
          autoSize
          readOnly
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
