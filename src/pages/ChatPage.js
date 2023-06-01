import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Empty, Layout, List, Menu,
} from 'antd';
import React, { useState } from 'react';

import VirtualList from 'rc-virtual-list';
import Post from '../components/Chat/Post';
import Poster from '../components/Chat/Poster';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit semper facilisis. Etiam in erat et libero ornare ultrices ut vitae ante. Vestibulum ac viverra risus. Nunc ultrices lorem finibus ante pretium, et faucibus ante lacinia. Nullam ut ipsum lectus. Quisque eu eros magna. Donec hendrerit ultricies dictum. Ut gravida sagittis nunc a vestibulum. Donec luctus malesuada mi. Nunc aliquet sed tellus sed consectetur. Suspendisse pellentesque pellentesque tellus a posuere. Nullam lobortis eu libero ut auctor. Nulla facilisi. Morbi sed nisl vitae eros faucibus posuere non vitae odio.';
const {
  Sider,
} = Layout;
function App() {
  const [messages] = useState([Post({
    comments: [
      { username: 'omer', content: lorem },
      { username: 'omer2', content: lorem },
      { username: 'omer', content: lorem },
      { username: 'omer2', content: lorem },
      { username: 'omer', content: lorem },
      { username: 'omer2', content: lorem },
      { username: 'omer', content: lorem },
      { username: 'omer2', content: lorem }],
    username: 'omer',
    isUsefull: true,
    content: lorem,
  }),
  Post({ username: 'steve', isUsefull: true, content: lorem }),
  Post({ username: 'steven', isUsefull: true, content: lorem })]);

  return (
    <Layout>
      <Sider style={{ padding: 20, marginTop: 50 }}>
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
      <div style={{
        backgroundColor: 'lightgreen', height: '100vh', overflowY: 'hidden', width: '-webkit-fill-available',
      }}
      >
        {!messages
          ? <Empty style={{ position: 'relative' }} />
          : (
            <List itemLayout="vertical" style={{ }}>
              <VirtualList
                height="85vh"
                data={messages}
                style={{ padding: '50px' }}
              >
                { (item) => (
                  item
                )}
              </VirtualList>
            </List>
          )}
        <Poster />
      </div>
    </Layout>
  );
}
export default App;
