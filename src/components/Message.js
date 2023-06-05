import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { clearMessage } from '../redux/actions/messageActions';

function Message() {
  const dispatch = useDispatch();
  const { type, content } = useSelector((state) => state.message);

  useEffect(() => {
    if (type && content) {
      message[type](content);
      dispatch(clearMessage());
    }
  }, [type, content, dispatch]);

  return null;
}

export default Message;
