import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const fileList = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33,
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error',
  },
];
function ImageUploader() {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
export default ImageUploader;
// /* tile uploaded pictures */
// .upload-list-inline .ant-upload-list-item {
//     float: left;
//     width: 200px;
//     margin-inline-end: 8px;
// }
//
// .ant-upload-rtl.upload-list-inline .ant-upload-list-item {
//     float: right;
// }
