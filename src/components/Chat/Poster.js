import {
  Button, Form, Modal, Upload,
} from 'antd';
import {
  SendOutlined,
  PictureOutlined,
  PlusCircleOutlined,
  PlusCircleFilled,
  PlusCircleTwoTone,
  CloseCircleTwoTone,
  UpCircleTwoTone, UpOutlined, CloseOutlined, UploadOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import TextEditor from './chatComponents/TextEditor';
import Tags from './Tags'; // Assuming TextEditor is in the same directory

function Poster() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [tagsError, setTagsError] = useState(false);

  const props = {
    action: '//jsonplaceholder.typicode.com/posts/', // TODO: change this to the server url
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Send the file to server and show the uploading progress bar etc.
      // return fetch('', {
      //   method: 'POST',
      //   body: file,
      // })
      //   .then((res) => res.json())
      //   .then(({ thumbnail }) => thumbnail);
    },
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = ({ body }) => {
    // logic to submit form to server
    form.resetFields();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: '#0000',
          border: 'none',
          position: 'fixed',
          bottom: '100px',
          right: '50px',
        }}
      >
        <PlusCircleTwoTone style={{ fontSize: '50px' }} color="blue" />
      </Button>
      <Modal
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        closable={false}
        okButtonProps={{ size: 'large', shape: 'circle', type: 'primary' }}
        okText={<UpOutlined style={{ fontSize: '25px' }} />}
        cancelButtonProps={{ size: 'large', shape: 'circle' }}
        cancelText={<CloseOutlined style={{ fontSize: '25px' }} />}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Create a post</h1>
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ padding: '20px' }}
          header={(
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Create a post</h1>
            </div>
          )}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter body of post',
              },
            ]}
            style={{ marginBottom: '20px', height: '200px' }}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            style={{ marginBottom: '0px' }}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Tags"
            validateStatus={tagsError ? 'error' : ''}
            help={tagsError ? 'Tag cannot be longer than 10 characters' : null}
          >
            <Tags trigger={setTagsError} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Poster;
