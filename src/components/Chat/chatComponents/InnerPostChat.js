import { SendOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import {
  Button, Input, List, Modal,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import PostComment from './comment';

export default function InnerPostChat({
  postId, title, isOpen, onClose,
}) {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const ContainerHeight = window.innerHeight * 0.6;
  const listRef = useRef(null);
  const [sendValue, SetSendValue] = useState('');
  const [loadedPage, setLoadedPage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(-1);
  const userSelector = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [messages, setMesssages] = useState([]);
  const scrollToBottom = () => {
    if (listRef.current) {
      const itemCount = messages.length; // Total number of items in the list
      const lastItemIndex = itemCount - 1; // Index of the last item

      // Scroll to the last item
      listRef.current.scrollTo({ index: lastItemIndex, align: 'end' });
    }
  };
  const send = (e) => {
    if (!socket) return;
    socket.emit('newMessage', { postId, sendValue });
    SetSendValue('');
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    // if (e.key === 'Enter' && !e.shiftKey) send(e);
    SetSendValue(e.target.value);
  };
  // Replace with your Socket.IO server's address
  const handleModalOpenClose = (open) => {
    if (open) {
      if (currentPage < 0) setCurrentPage(1);
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

  const appendData = () => {
    console.log('loading page:', currentPage);
    fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/comments/${postId}/${currentPage}/15 `, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          console.log(data);
          setMesssages((oldList) => data.map((msg) => <PostComment message={msg} />)
            .concat(oldList));
          setLoadedPage(currentPage);
          listRef.current.scrollTo({ index: 15, align: 'start' });
        }
      });
  };
  const onScroll = (e) => {
    if (e.currentTarget.scrollTop <= 100) {
      if (currentPage === loadedPage) {
        setCurrentPage((old) => old + 1);
      }
    }
  };
  useEffect(() => {
    if (!socket) return;
    socket.emit('join', postId);
    socket.on('messageReceived', (message) => {
      setMesssages((oldList) => oldList.concat(<PostComment message={message} />));
      setShouldScrollToBottom(true);
    });
  }, [socket]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    } if (loadedPage >= 1) setShouldScrollToBottom(false);
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    if (currentPage < 0) return;
    appendData();
  }, [currentPage]);
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
      <List
        itemLayout="vertical"
      >
        <VirtualList
          ref={listRef}
          height={ContainerHeight}
          data={messages}
          onScroll={onScroll}
          itemKey="_id"
        >
          { (item) => (
            <div style={{ padding: '10px 100px 10px 100px' }}>
              {item}
            </div>
          )}
        </VirtualList>
      </List>

    </Modal>
  );
}
