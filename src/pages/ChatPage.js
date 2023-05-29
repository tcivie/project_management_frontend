import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Empty, Layout, List, Menu,
} from 'antd';
import React, { useState } from 'react';

import Post from '../components/Chat/Post';

const {
  Content, Sider,
} = Layout;
function App() {
  const [messages, SetMessage] = useState([Post({ isUsefull: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit semper facilisis. Etiam in erat et libero ornare ultrices ut vitae ante. Vestibulum ac viverra risus. Nunc ultrices lorem finibus ante pretium, et faucibus ante lacinia. Nullam ut ipsum lectus. Quisque eu eros magna. Donec hendrerit ultricies dictum. Ut gravida sagittis nunc a vestibulum. Donec luctus malesuada mi. Nunc aliquet sed tellus sed consectetur. Suspendisse pellentesque pellentesque tellus a posuere. Nullam lobortis eu libero ut auctor. Nulla facilisi. Morbi sed nisl vitae eros faucibus posuere non vitae odio.' })]);
  return (
    <Layout>
      <Sider style={{ height: '100vh' }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
              style: { backgroundColor: 'darkorange' },
            }),
          )}
        />
      </Sider>
      <Content>
        <div style={{ backgroundColor: 'white', marginTop: '3%' }}>
          {!messages
            ? <Empty style={{ position: 'relative', top: '40%' }} />
            : (
              <List
                dataSource={messages}
                size="Large"
                itemLayout="vertical"
                bordered
                renderItem={(item, index) => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            )}
        </div>
      </Content>
    </Layout>
  );
}
export default App;
