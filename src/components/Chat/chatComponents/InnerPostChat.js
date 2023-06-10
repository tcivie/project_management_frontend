import { SendOutlined } from '@ant-design/icons';
import {
  Button, Input, List, Modal,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export default function InnerPostChat({
  postId, title, isOpen, onClose,
}) {
  const [sendValue, SetSendValue] = useState('');
  const userSelector = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [messages, setMesssages] = useState([]);
  const send = (e) => {
    if (!socket) return;
    socket.emit('newMessage', { postId, sendValue });
    SetSendValue('');
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    SetSendValue(e.target.value);
  };
  // Replace with your Socket.IO server's address
  const handleModalOpenClose = (open) => {
    if (open) {
      setSocket((io('http://localhost:4005', {
        reconnectionDelayMax: 10000,
        auth: {
          token: userSelector.token,
        },
        query: {
          postId,
        },
      })));
    }
  };
  useEffect(() => {
    if (!socket) return;
    socket.emit('join', postId);
    socket.emit('newMessage', 'hi');
    socket.on('messageReceived', (message) => {
      setMesssages([...messages, <List.Item>{message}</List.Item>]);
    });
  }, [socket]);
  const handleCancel = () => {
    if (socket) { socket.emit('disconnet', postId); }
    if (onClose) onClose();
  };
  const textAndButton = (
    <div style={{ position: 'relative' }}>
      <Input.TextArea placeholder="Send a comment..." onChange={handleOnChange} value={sendValue} autoSize={{ minRows: 1, maxRows: 3 }} onPressEnter={send} style={{ padding: '10px', paddingRight: '5%' }} />
      <Button
        type="primary"
        icon={<SendOutlined />}
        shape="circle"
        onClick={send}
        style={{
          position: 'absolute', top: '50%', right: '17px', transform: 'translateY(-50%)',
        }}
      />
    </div>
  );

  return (
    <Modal
      title={`${title} - Chat`}
      width="90%"
      bodyStyle={{ height: '60vh' }}
      open={isOpen}
      onCancel={handleCancel}
      afterOpenChange={handleModalOpenClose}
      footer={textAndButton}
    >
      <List>
        {messages}
      </List>

    </Modal>
  );
}
