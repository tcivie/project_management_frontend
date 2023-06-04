import {
  Button, FloatButton, Form, Input, Modal,
} from 'antd';
import {
  PlusCircleTwoTone, UpOutlined, CloseOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Assuming TextEditor is in the same directory
import Cookies from 'js-cookie';
import TextEditor from './chatComponents/TextEditor';
import Tags from './Tags';
import ImageUploader from './ImageUploader';
import * as postsActions from '../../redux/actions/postAction';
import { postCreated } from '../../redux/actions/postAction';
import LoginForm from '../Login';

function Poster(params) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const tagsSelector = useSelector((state) => state.tag);
  const isTagsError = tagsSelector.isError;
  const userSelector = useSelector((state) => state.user);
  const userId = userSelector.userData?.id;
  const isUserAuthenticated = userSelector.isAuthenticated;
  const dispatch = useDispatch();
  const fileSelector = useSelector((state) => state.file);
  const { fileList } = fileSelector;
  const { cityId, lang } = params;

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('language', lang);
    formData.append('city', cityId);
    formData.append('userId', userId);
    formData.append('title', form.getFieldValue('title'));
    formData.append('content', form.getFieldValue('body'));
    tagsSelector.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
    fileList.forEach((image) => formData.append('images', image.originFileObj, image.name));
    fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        ContentType: 'multipart/form-data',
      },
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // dispatch an action to update the state
        dispatch(postCreated(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    form.resetFields();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <FloatButton
        icon={(<PlusCircleTwoTone color="blue" />)}
        type="primary"
        onClick={showModal}
      />
      <Modal
        open={visible}
        centered
        onOk={isUserAuthenticated ? form.submit : null}
        onCancel={handleCancel}
        closable={false}
        okButtonProps={isUserAuthenticated ? { size: 'large', shape: 'circle', type: 'primary' } : {
          size: 'large', shape: 'circle', type: 'primary', disabled: true,
        }}
        okText={<UpOutlined style={{ fontSize: '25px' }} />}
        cancelButtonProps={{ size: 'large', shape: 'circle' }}
        cancelText={<CloseOutlined style={{ fontSize: '25px' }} />}
      >
        {isUserAuthenticated ? (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', padding: '0px' }}>Create post</h1>
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
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter title of post',
                  },
                ]}
                style={{ marginBottom: '20px' }}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                name="body"
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
                name="tags"
                label="Tags"
                validateStatus={isTagsError ? 'error' : ''}
                help={isTagsError ? 'Tag cannot be longer than 10 characters' : null}
                style={{ marginBottom: '0px' }}
              >
                <Tags />
              </Form.Item>
              <Form.Item
                name="images"
                style={{ marginBottom: '0px', paddingTop: '10px' }}
              >
                <ImageUploader />
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', padding: '0px' }}>Please login to create a post</h1>
            <LoginForm />
          </>
        )}

      </Modal>
    </>
  );
}

export default Poster;
