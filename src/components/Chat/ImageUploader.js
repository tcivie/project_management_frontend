import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { setFileList } from '../../redux/actions/fileActions';

function ImageUploader() {
  const dispatch = useDispatch();
  const { fileList } = useSelector((state) => state.file);

  const customRequest = ({ file, onProgress, onSuccess }) => {
    setTimeout(() => {
      onProgress({ percent: 100 }, file);
      onSuccess('ok', file);
    }, 0);
  };

  const handleChange = (info) => {
    const updatedFileList = info.fileList.map((file) => {
      const newFile = { ...file };
      if (file.response) {
        newFile.url = file.response.url;
      }
      return newFile;
    });

    dispatch(setFileList(updatedFileList));
  };

  return (
    <Upload
      customRequest={customRequest}
      name="postImage"
      listType="picture"
      maxCount={3}
      fileList={fileList}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

export default ImageUploader;
