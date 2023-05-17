import React, {useEffect, useState} from 'react';
import { Map } from 'pigeon-maps';
import { Input, Layout, Row, Col, Card, Space } from 'antd';

const { Content } = Layout;

const HomePage = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        fetch('https://api.unsplash.com/photos/random?client_id=5sMDfSQu2P21xA28tR-jOyjkPv9rj1l9ZniybmqaI-o&query=nature')
            .then(response => response.json())
            .then(data => setBackgroundImage(data.urls.regular))
            .catch(error => console.error(error));
    }, []);

    return (
        <Layout style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Content style={{
                padding: '0 50px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backdropFilter: 'blur(50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }}>
                <Card style={{ width: '80vw', margin: 'auto', padding: 0 }}>
                    <Input.Search size="large" placeholder="Search..."  style={{ marginBottom: '1em' }} />
                    <Map height={400} defaultCenter={[50.879, 4.6997]} defaultZoom={11} />
                </Card>
            </Content>
        </Layout>
    );
}

export default HomePage;
