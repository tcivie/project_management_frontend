import React, { useEffect, useState } from 'react';

import {
  Layout, Card,
} from 'antd';
import SearchBar from '../components/SearchBar';
import MyMap from '../components/MyMap';

const { Content } = Layout;

function HomePage() {
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.unsplash.com/photos/random?client_id=5sMDfSQu2P21xA28tR-jOyjkPv9rj1l9ZniybmqaI-o&query=nature',
    )
      .then((response) => response.json())
      .then((data) => setBackgroundImage(data.urls.regular))
    // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Content
        style={{
          padding: '0 50px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backdropFilter: 'blur(50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <Card style={{ width: '80vw', margin: 'auto', padding: 0 }}>
          <SearchBar />
          <MyMap />
        </Card>
      </Content>
    </Layout>
  );
}

export default HomePage;
