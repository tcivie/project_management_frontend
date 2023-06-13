import { SendOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import {
  Button, Input, List, Modal,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();

  const populateMessagesWithUserData = async (msg) => {
    let newIds = [];
    if (!Array.isArray(msg)) {
      newIds = [msg.userId];
    } else {
      newIds = msg.map((item) => item.userId);
    }
    const idsSafeForURL = encodeURIComponent(newIds.join(','));

    try {
      const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${idsSafeForURL}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          ContentType: 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      return msg.map((item) => {
        const user = data.find((u) => u._id === item.userId);
        return { ...item, user };
      });
    } catch (err) {
      return msg;
    }
  };

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
    // const { userId, content, replyTo } = req.body;
    fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/post/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: userSelector.id,
        content: sendValue,
      }),
    });
  };
  const handleOnChange = (e) => {
    // if (e.key === 'Enter' && !e.shiftKey) send(e);
    SetSendValue(e.target.value);
  };
  // Replace with your Socket.IO server's address
  const handleModalOpenClose = (open) => {
    if (open) {
      if (currentPage < 0) setCurrentPage(1);
      setSocket((io(process.env.REACT_APP_SOCKET_SERVER, {
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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/comments/${postId}/${currentPage}/15 `, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.length) {
          // const messagesWithUserData = await populateMessagesWithUserData(data);
          // console.log(messagesWithUserData);
          populateMessagesWithUserData(data)
            .then((messagesWithUserData) => {
              // eslint-disable-next-line max-len
              setMesssages((oldList) => messagesWithUserData.map((msg) => <PostComment message={msg} />).concat(oldList));
              setLoadedPage(currentPage);
              listRef.current.scrollTo({ index: 15, align: 'start' });
            });
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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/posts/post/joinChat/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          dispatch({ type: 'USER_JOINED', payload: userSelector.userData.id });
        }
        dispatch({ type: 'USER_JOINED', payload: userSelector.userData.id });
      });
    socket.on('messageReceived', (message) => {
      populateMessagesWithUserData(message)
        .then((messageWithUserData) => {
          setMesssages((oldList) => oldList.concat(<PostComment message={messageWithUserData} />));
          setShouldScrollToBottom(true);
        });
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
    if (socket) {
      socket.emit('disconnet', postId);
      fetch(`${process.env.REACT_APP_API_SERVER}/api/posts/post/leaveChat/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          ContentType: 'application/json',
        },
        credentials: 'include',
      })
        .then((res) => {
          if (res.ok) {
            dispatch({ type: 'USER_LEFT', payload: userSelector.userData.id });
          } dispatch({ type: 'USER_LEFT', payload: userSelector.userData.id });
        });
    }
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
