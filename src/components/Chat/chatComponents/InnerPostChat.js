import { SendOutlined } from '@ant-design/icons';
import {
  Button, Input, List, Modal,
} from 'antd';
import { useRef, useState } from 'react';

export default function InnerPostChat({
  postid, title, isOpen, onClose,
}) {
  const textRef = useRef(null);
  const send = () => {
    console.log(textRef.current);
  };

  const textAndButton = (
    <div style={{ position: 'relative' }}>
      <Input.TextArea ref={textRef} autoSize={{ minRows: 1, maxRows: 3 }} onPressEnter={send} style={{ padding: '10px', paddingRight: '5%' }} />
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
      onCancel={onClose}
      destroyOnClose
      footer={textAndButton}
    >
      <List />

    </Modal>
  );
}
