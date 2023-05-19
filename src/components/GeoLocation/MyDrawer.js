// MyDrawer.js

import React from 'react';
import {
  Button,
  Drawer,
  List,
  Divider,
  Descriptions,
  Statistic,
  Skeleton, Row, Col, Badge, Avatar, Space,
} from 'antd';
import {
  LikeOutlined, StarOutlined, TeamOutlined, MessageOutlined,
} from '@ant-design/icons';

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}
function MyDrawer({
  visible, onClose, locationInfo, chatRoomInfo, stats,
}) {
  return (
    <Drawer
      title="Location Information"
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
      size="large"
    >
      <Skeleton loading={locationInfo === null || chatRoomInfo === null}>
        <Row gutter={16}>
          <Descriptions>
            <Descriptions.Item label="Location">{locationInfo?.location}</Descriptions.Item>
            <Descriptions.Item label="Local Time">{locationInfo?.localTime}</Descriptions.Item>
            <Descriptions.Item label="Other Info">{locationInfo?.otherInfo}</Descriptions.Item>
          </Descriptions>
        </Row>
        <Row>
          <Col span={8}>
            <Statistic
              title="Active Users"
              value={chatRoomInfo?.reduce((total, room) => total + room.activeUsers, 0)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="A.Response Time"
              value={stats?.averageResponseTime}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Posts Last 7 Days"
              value={stats?.numberOfPosts}
            />
          </Col>
        </Row>
        <Divider> Chat Rooms </Divider>
        <div
          style={{
            height: '120px',
            overflow: 'auto',
            padding: '16px 16px',
            border: '1px solid #e8e8e8',
          }}
        >
          <List
            dataSource={chatRoomInfo}
            grid={{ gutter: 16, column: 3 }}
            renderItem={(item) => (
              <Badge.Ribbon
                color="volcano"
                text={<> <TeamOutlined /> {`${item.activeUsers} users`} </>}
                status="processing"
                style={{ right: '2px', top: '-10px' }}
                hasMore={chatRoomInfo.length < 10}
              >
                <List.Item>
                  <Button type="primary" block>
                    <div style={{ float: 'left' }}>
                      {item.emoji} {item.language}
                    </div>
                  </Button>
                </List.Item>
              </Badge.Ribbon>
            )}
          />
        </div>
        <Row gutter={32}>
          <Col span={12}>
            <Divider> Nearby Cities </Divider>
            <div
              style={{
                height: '45vh',
                overflow: 'auto',
                padding: '16px 16px',
                border: '1px solid #e8e8e8',
              }}
            >

              <List
                dataSource={locationInfo?.nearbyCities}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(item) => (
                  <List.Item>
                    <Badge.Ribbon
                      color="volcano"
                      text={<> <TeamOutlined /> {`${item.activeUsers} users`} </>}
                      status="processing"
                      style={{ right: '-6px', top: '-10px' }}
                      hasMore={chatRoomInfo.length < 10}
                    >
                      <Button type="primary" block>
                        <div style={{ float: 'left' }}>
                          {item.cityName} {item.countryName}
                        </div>
                      </Button>
                    </Badge.Ribbon>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col span={12}>
            <Divider> Trending Topics </Divider>
            <div
              style={{
                height: '45vh',
                overflow: 'auto',
                padding: '16px 16px',
                border: '1px solid #e8e8e8',
              }}
            >
              <List
                dataSource={stats?.trendingPosts}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={(
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                        )}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </Skeleton>
    </Drawer>
  );
}

export default MyDrawer;
