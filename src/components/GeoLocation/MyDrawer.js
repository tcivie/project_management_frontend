// MyDrawer.js

import React, { useState } from 'react';
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
import markerClick, { drawerClose } from '../../redux/actions/drawerActions';
import unicodeToEmoji from '../../utils/unicodeToEmoji';
import OGCard from '../OGCard';

function MyDrawer() {
  const drawerReducer = useSelector((state) => state.drawer);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, stats, visible, wikiInfo,
  } = drawerReducer; const dispatch = useDispatch();
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
      headerStyle={{
        display: 'block', justifyContent: 'stretch', padding: '10px 10px 0px 10px',
      }}
      bodyStyle={{ padding: '0px 10px 0px 10px' }}
      extra={<div style={{ paddingLeft: '35%', marginBottom: '10px' }}><OGCard wikiId={locationInfo?.wikiDataId} /></div>}
      // title={locationInfo?.location || 'no city selected'}
      placement="right"
      closable
      onClose={() => dispatch(drawerClose())}
      visible={visible}
      size="large"
    >
      <Skeleton loading={locationInfo === null || chatRoomInfo === null}>

        <Divider style={{ margin: '6px' }}> Chat Rooms
        </Divider>
        <div
          style={{
            height: '120px',
            overflow: 'auto',
            padding: '8px 8px',
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
                padding: '8px 8px',
                border: '1px solid #e8e8e8',
              }}
            >
              <List
                dataSource={nearbyCities || []}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(item) => (
                  locationInfo?.name !== item.name && (
                  <List.Item>
                    <Badge.Ribbon
                      color="volcano"
                      text={<> <TeamOutlined /> {`${item.activeUsers || '###'}`} </>}
                      status="processing"
                      style={{ right: '-6px', top: '-10px' }}
                      hasMore={chatRoomInfo.length < 10}
                    >
                      <Button type="primary" block onClick={() => dispatch(markerClick({ payload: [item] }))}>
                        <div style={{ float: 'left' }}>
                          {item.name} {item.country}
                        </div>
                      </Button>
                    </Badge.Ribbon>
                  </List.Item>
                  )
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
                padding: '8px 8px',
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
