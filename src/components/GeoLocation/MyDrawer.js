// MyDrawer.js

import React from 'react';
import {
  Button,
  Drawer,
  List,
  Divider,
  Descriptions,
  Statistic,
  Skeleton, Row, Col, Badge,
} from 'antd';
import { TeamOutlined } from '@ant-design/icons';

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
    >
      <Skeleton loading={locationInfo === null || chatRoomInfo === null}>
        <Descriptions title="Location Info">
          <Descriptions.Item label="Location">{locationInfo?.location}</Descriptions.Item>
          <Descriptions.Item label="Local Time">{locationInfo?.localTime}</Descriptions.Item>
          <Descriptions.Item label="Other Info">{locationInfo?.otherInfo}</Descriptions.Item>
        </Descriptions>

        <Divider />
        <Row justify="center">
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

        <Divider />

        <List
          dataSource={chatRoomInfo}
          renderItem={(item) => (
            <Badge.Ribbon
              color="volcano"
              text={<> <TeamOutlined /> {`${item.activeUsers} users`} </>}
              status="processing"
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
      </Skeleton>
    </Drawer>
  );
}

export default MyDrawer;
