import React, { useEffect, useState } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { Input, Layout, Row, Col, Card, Space } from 'antd';

const { Content } = Layout;
const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

const HomePage = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Get current position coordinates
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude });
            },
            (error) => {
                console.error('Error retrieving geolocation:', error);
            },
        );
    }, []);
    useEffect(() => {
        fetch(
            'https://api.unsplash.com/photos/random?client_id=5sMDfSQu2P21xA28tR-jOyjkPv9rj1l9ZniybmqaI-o&query=nature',
        )
            .then((response) => response.json())
            .then((data) => setBackgroundImage(data.urls.regular))
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
                    <Input.Search
                        size='large'
                        placeholder='Search...'
                        style={{ marginBottom: '1em' }}
                    />
                    {location ? (
                        <Map
                            defaultCenter={[location.lat, location.lon]}
                            center={[location.lat, location.lon]}
                            zoom={15}
                            provider={maptilerProvider}
                            height={400}
                            defaultZoom={11}
                        ></Map>
                    ) : (
                        <Map
                            provider={maptilerProvider}
                            height={400}
                            defaultCenter={[50.879, 4.6997]}
                            defaultZoom={11}
                        />
                    )}
                </Card>
            </Content>
        </Layout>
    );
};

export default HomePage;
