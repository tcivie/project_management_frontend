// MyDrawer.js
import React from 'react';
import {
  Drawer,
  List,
  Divider,
  Skeleton, Row, Col,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import markerClick, { drawerClose } from '../../redux/actions/drawerActions';
import OGCard from '../OGCard';
import { RandomNumberBadgeChatRooms, RandomNumberBadgeNearbyCities } from '../randomBadgeNumber';

function MyDrawer() {
  const drawerReducer = useSelector((state) => state.drawer);
  const {
    chatRoomInfo, isUserMarker, locationInfo, nearbyCities, visible,
  } = drawerReducer; const dispatch = useDispatch();
  let chatRoomInfoParsed = [];
  if (chatRoomInfo !== null) {
    chatRoomInfoParsed = Object.keys(chatRoomInfo).map((key) => {
      const item = chatRoomInfo[key];
      return {
        key,
        ...item,
        ...locationInfo,
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
      placement="right"
      closable
      onClose={() => dispatch(drawerClose())}
      visible={visible}
      width="50%"
    >
      <OGCard wikiId={locationInfo?.wikiDataId} />
      <Divider style={{ margin: '6px' }}> Chat Rooms
      </Divider>
      <div
        style={{
          height: '120px',
          overflow: 'auto',
          padding: '20px 20px',
          border: '1px solid #e8e8e8',
        }}
      >
        <List
          dataSource={chatRoomInfoParsed}
          grid={{ gutter: 16, column: 3 }}
          renderItem={(item) => <RandomNumberBadgeChatRooms item={item} />}
        />
      </div>
      <Row gutter={32}>
        <Col span={12}>
          <Divider> Nearby Cities </Divider>
          <div
            style={{
              height: '45vh',
              overflow: 'auto',
              padding: '20px 20px',
              border: '1px solid #e8e8e8',
            }}
          >
            <List
              dataSource={nearbyCities || []}
              grid={{ gutter: 16, column: 1 }}
              renderItem={(item) => (
                locationInfo?.name !== item.name && (
                  <RandomNumberBadgeNearbyCities
                    item={item}
                    onClick={() => dispatch(markerClick({ payload: [item] }))}
                  />
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
          >
            <Skeleton loading active avatar />
            <Skeleton loading active avatar />
            <Skeleton loading active avatar />
            <Skeleton loading active avatar />
            <Skeleton loading active avatar />
            <Skeleton loading active avatar />

          </div>
        </Col>
      </Row>
    </Drawer>
  );
}

export default MyDrawer;
