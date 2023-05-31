import {
  Button, Col, Form, Image, Modal, Row, Upload,
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
import Tags from './Tags';
import ImageUploader from './ImageUploader'; // Assuming TextEditor is in the same directory

function Poster() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [tagsError, setTagsError] = useState(false);

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
        <Form.Item
          style={{ marginBottom: '0px', padding: '0px' }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', padding: '0px' }}>Create post</h1>
        </Form.Item>
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
            label="Tags"
            validateStatus={tagsError ? 'error' : ''}
            help={tagsError ? 'Tag cannot be longer than 10 characters' : null}
            style={{ marginBottom: '0px' }}
          >
            <Tags trigger={setTagsError} />
          </Form.Item>
          <Form.Item
            name="images"
            style={{ marginBottom: '0px', paddingTop: '10px' }}
          >
            <ImageUploader />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Poster;
