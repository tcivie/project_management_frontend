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
import { drawerClose } from '../../redux/actions/drawerActions';
import unicodeToEmoji from '../../utils/unicodeToEmoji';
import OGCard from '../OGCard';

function MyDrawer() {
  const [wikiInformation, setWikiInformation] = useState(null);
  const drawerReducer = useSelector((state) => state.drawer);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, stats, visible, wikiInfo,
  } = drawerReducer;
  console.log('drawerReducer', drawerReducer);
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
  console.log('locationInfo?.wikiDataId', locationInfo?.wikiDataId);
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
        <Row>
          {locationInfo?.wikiDataId ? (
            <OGCard wikiId={locationInfo?.wikiDataId} />
          ) : (
            'No Wiki Data'
          )}
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
