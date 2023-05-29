import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function Poster() {
  return (
    <div style={{ padding: 10 }}>
      <Form layout="inline" style={{ justifyContent: 'space-evenly' }}>
        <Form.Item>
          <Input.TextArea
            placeholder="Write your message here"
            bordered={false}
            autoSize={{ minRows: 1, maxRows: 6 }}
            style={{
              fontSize: 18,
              width: '70vw',
              backgroundColor: 'lightgray',
              padding: '2px',
              resize: 'none',
              borderRadius: 30,
              boxShadow: '0 0 0 2px #000',
              border: '10px solid transparent',
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '50px', height: '50px' }} icon={<SendOutlined style={{ fontSize: '25px' }} />} size="large" shape="circle" type="primary" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Poster;
