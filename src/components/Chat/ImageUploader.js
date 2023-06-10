import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useState } from 'react';
import { setFileList } from '../../redux/actions/fileActions';

function ImageUploader({ existingImages }) {
  const dispatch = useDispatch();
  const { fileList } = useSelector((state) => state.file);
  const [images, setImages] = useState(existingImages || fileList);

  const customRequest = ({ file, onProgress, onSuccess }) => {
    setTimeout(() => {
      onProgress({ percent: 100 }, file);
      onSuccess('ok', file);
    }, 0);
  };

  const handleChange = (info) => {
    const updatedFileList = info.fileList.map((file) => {
      if (file.status !== 'removed') {
        const newFile = { ...file };
        if (file.response) {
          newFile.url = file.response.url;
        }
        return newFile;
      }
      return null;
    });
    setImages(updatedFileList);
    dispatch(setFileList(updatedFileList));
  };

  return (
    <Upload
      customRequest={customRequest}
      name="postImage"
      listType="picture"
      maxCount={3}
      fileList={images}
      onChange={handleChange}
      defaultFileList={images}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

export default ImageUploader;
