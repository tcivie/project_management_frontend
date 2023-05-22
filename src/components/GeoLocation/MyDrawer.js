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
import {
  TeamOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { drawerClose } from '../../redux/actions/drawerActions';
import unicodeToEmoji from '../../utils/unicodeToEmoji';

function MyDrawer() {
  const drawerReducer = useSelector((state) => state.drawer);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, stats, visible,
  } = drawerReducer;
  const dispatch = useDispatch();

  let chatRoomInfoParsed = [];
  if (chatRoomInfo !== null) {
    chatRoomInfoParsed = Object.keys(chatRoomInfo).map((key) => {
      const item = chatRoomInfo[key];
      return {
        key,
        ...item,
      };
    });
  }

  if (isUserMarker) {
    return (
      <Drawer
        title="Your Location"
        placement="right"
        closable
        onClose={() => dispatch(drawerClose())}
        visible={visible}
        size="small"
      />
    );
  }
  return (
    <Drawer
      title={locationInfo?.name || 'Mulitple Cities'}
      // title={locationInfo?.location || 'no city selected'}
      placement="right"
      closable
      onClose={() => dispatch(drawerClose())}
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
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="A.Response Time"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Posts Last 7 Days"
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
            dataSource={chatRoomInfoParsed}
            grid={{ gutter: 16, column: 3 }}
            renderItem={(item) => (
              <Badge.Ribbon
                color="volcano"
                text={<> <TeamOutlined /> ### </>}
                status="processing"
                style={{ right: '2px', top: '-10px' }}
                hasMore={chatRoomInfoParsed.length < 10}
              >
                <List.Item>
                  <Button type="primary" block>
                    <div style={{ float: 'left' }}>
                      {item?.nameInEnglish} {unicodeToEmoji(item?.emoji)} {item?.nameInNative}
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
                dataSource={nearbyCities || []}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(item) => (
                  <List.Item>
                    <Badge.Ribbon
                      color="volcano"
                      text={<> <TeamOutlined /> {`${item.activeUsers || '###'}`} </>}
                      status="processing"
                      style={{ right: '-6px', top: '-10px' }}
                      hasMore={chatRoomInfo.length < 10}
                    >
                      <Button type="primary" block>
                        <div style={{ float: 'left' }}>
                          {item.name} {item.country}
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
            ><Skeleton />
            </div>
          </Col>
        </Row>
      </Skeleton>
    </Drawer>
  );
}

export default MyDrawer;
