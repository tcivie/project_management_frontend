import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Empty, Layout, List, Menu,
} from 'antd';
import React, { useState } from 'react';

import VirtualList from 'rc-virtual-list';
import { useSelector } from 'react-redux';
import { Header } from 'antd/es/layout/layout';
import Post from '../components/Chat/Post';
import Poster from '../components/Chat/Poster';

const {
  Content, Sider,
} = Layout;
function App() {
  const drawerReducer = useSelector((state) => state.drawer);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, visible,
  } = drawerReducer;
  console.log(locationInfo?.name);
  const [messages, SetMessage] = useState([Post({
    comments: 'dsa', username: 'omer', isUsefull: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit semper facilisis. Etiam in erat et libero ornare ultrices ut vitae ante. Vestibulum ac viverra risus. Nunc ultrices lorem finibus ante pretium, et faucibus ante lacinia. Nullam ut ipsum lectus. Quisque eu eros magna. Donec hendrerit ultricies dictum. Ut gravida sagittis nunc a vestibulum. Donec luctus malesuada mi. Nunc aliquet sed tellus sed consectetur. Suspendisse pellentesque pellentesque tellus a posuere. Nullam lobortis eu libero ut auctor. Nulla facilisi. Morbi sed nisl vitae eros faucibus posuere non vitae odio.',
  }),
  Post({ username: 'steve', isUsefull: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit semper facilisis. Etiam in erat et libero ornare ultrices ut vitae ante. Vestibulum ac viverra risus. Nunc ultrices lorem finibus ante pretium, et faucibus ante lacinia. Nullam ut ipsum lectus. Quisque eu eros magna. Donec hendrerit ultricies dictum. Ut gravida sagittis nunc a vestibulum. Donec luctus malesuada mi. Nunc aliquet sed tellus sed consectetur. Suspendisse pellentesque pellentesque tellus a posuere. Nullam lobortis eu libero ut auctor. Nulla facilisi. Morbi sed nisl vitae eros faucibus posuere non vitae odio.' }),
  Post({ username: 'steven', isUsefull: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit semper facilisis. Etiam in erat et libero ornare ultrices ut vitae ante. Vestibulum ac viverra risus. Nunc ultrices lorem finibus ante pretium, et faucibus ante lacinia. Nullam ut ipsum lectus. Quisque eu eros magna. Donec hendrerit ultricies dictum. Ut gravida sagittis nunc a vestibulum. Donec luctus malesuada mi. Nunc aliquet sed tellus sed consectetur. Suspendisse pellentesque pellentesque tellus a posuere. Nullam lobortis eu libero ut auctor. Nulla facilisi. Morbi sed nisl vitae eros faucibus posuere non vitae odio.' })]);
  const onScroll = (e) => {
    // if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //   appendData();
    // }
  };
  return (
    <Layout>
      <Header style={{
        backgroundColor: 'MediumSeaGreen', color: 'white', textAlign: 'center', fontSize: 30,
      }}
      >
        {locationInfo?.name}
      </Header>
      <Layout>
        <Sider style={{ padding: 20 }}>
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
        <Layout>
          <Content style={{ backgroundColor: 'lightgrey' }}>
            <div>
              {!messages
                ? <Empty style={{ position: 'relative', top: '40%' }} />
                : (
                  <List itemLayout="vertical" style={{ }}>
                    <VirtualList
                      style={{ paddingLeft: '10%' }}
                      height="78.7vh"
                      data={messages}
                      onScroll={onScroll}
                    >
                      { (item) => (
                        item
                      )}
                    </VirtualList>
                  </List>
                )}
              <Poster />
            </div>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default App;
