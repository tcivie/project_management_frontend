import Cookies from 'js-cookie';
import {
  Button, Modal, Form, Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import TextEditor from './TextEditor';
import Tags from '../Tags';
import ImageUploader from '../ImageUploader';
import { postUpdated } from '../../../redux/actions/postAction';
import { setMessage } from '../../../redux/actions/messageActions';
import { setTags } from '../../../redux/actions/tagActions';

function EditPost({ postId }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const tagsSelector = useSelector((state) => state.tag);
  const { fileList } = useSelector((state) => state.file);
  const isTagsError = tagsSelector.isError;
  console.log('postId', postId);
  const { confirm } = Modal;

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/post/getSinglePost/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        console.log('data', data);
        form.setFieldValue('title', data.post.title);
        setContent(data.post.content);
        dispatch(setTags(data.post.tags));
        setImages(data.post.postImages.map((image, index) => ({
          // make the image url urlsafe
          uid: index,
          name: image.name ? image.name : image.split('/').pop(),
          path: image.path ? image.path : image,
          status: 'done',
          url: image.url ? image.url : `${process.env.REACT_APP_API_SERVER}/api/images/postImage/${encodeURIComponent(image)}`,
        })));
        setVisible(true);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', form.getFieldValue('title'));
      formData.append('content', content);
      tagsSelector.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
      // append existing images
      console.log('fileList', fileList);
      const existingImages = fileList
        .filter((image) => !image.originFileObj)
        .map((image) => image.path);
      formData.append('existingImages', JSON.stringify(existingImages));

      // append new images
      const newImages = fileList
        .filter((image) => image.originFileObj)
        .map((image) => image.originFileObj);
      newImages.forEach((image) => formData.append('images', image, image.name));

      await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/update/${postId}`, {
        method: 'PATCH',
        headers: {
          ContentType: 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: formData,
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          setVisible(false);
          dispatch(postUpdated(formData));
          dispatch(setMessage('success', 'Post updated successfully.'));
        } else {
          dispatch(setMessage('error', 'Error updating post.'));
        }
      });
    } catch (err) {
      dispatch(setMessage('error', 'Error updating post.'));
      console.error('Error:', err);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    confirm({
      title: 'Are you sure you want to delete this post?',
      icon: <ExclamationCircleFilled />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        try {
          const response = fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/delete/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
            credentials: 'include',
          }).then((res) => {
            if (!res.ok) {
              setVisible(false);
              dispatch(setMessage('error', 'Error deleting post.'));
            } else {
              setVisible(false);
              dispatch(setMessage('success', 'Post deleted successfully.'));
            }
          });
        } catch (err) {
          setVisible(false);
          dispatch(setMessage('error', 'Error deleting post.'));
          console.error('Error:', err);
        }
      },
      onCancel() {
      },
    });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Post"
      okText="Update"
      cancelText="Cancel"
      onCancel={handleCancel}
      footer={[
        // Make space between buttons
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>
          <div>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={form.submit}>
              Update
            </Button>
          </div>
        </div>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleUpdate}
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
          <TextEditor content={content} onChange={setContent} />
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
          <ImageUploader existingImages={images} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditPost;
