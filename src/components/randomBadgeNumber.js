import { useEffect, useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Button, Badge, List } from 'antd';
import unicodeToEmoji from '../utils/unicodeToEmoji';

export function RandomNumberBadgeChatRooms({ item }) {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * (501)));

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = randomNumber + Math.floor(Math.random() * 101) - 50;
      setRandomNumber(Math.min(500, Math.max(0, newNumber)));
    }, 3000);
    return () => clearInterval(interval);
  }, [randomNumber]);

  return (
    <Badge.Ribbon
      color="volcano"
      text={<> <TeamOutlined /> {randomNumber} </>}
      status="processing"
      style={{ right: '0px', top: '-10px' }}
    >
      <List.Item>
        <Button type="primary" block>
          <div style={{ float: 'left' }}>
            {item?.nameInEnglish} {unicodeToEmoji(item?.emoji)} {item?.nameInNative}
          </div>
        </Button>
      </List.Item>
    </Badge.Ribbon>
  );
}

export function RandomNumberBadgeNearbyCities({ item, onClick }) {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * (501)));

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = randomNumber + Math.floor(Math.random() * 101) - 50;
      setRandomNumber(Math.min(500, Math.max(0, newNumber)));
    }, 3000);
    return () => clearInterval(interval);
  }, [randomNumber]);

  return (
    <Badge.Ribbon
      color="volcano"
      text={<> <TeamOutlined /> {randomNumber} </>}
      status="processing"
      style={{ right: '-6px', top: '-10px' }}
    >
      <List.Item>
        <Button type="primary" block onClick={onClick}>
          <div style={{ float: 'left' }}>
            {item.name} {item.country}
          </div>
        </Button>
      </List.Item>
    </Badge.Ribbon>
  );
}

export default { RandomNumberBadgeChatRooms, RandomNumberBadgeNearbyCities };
