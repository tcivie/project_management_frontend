import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <h2>Welcome to My Professional Website</h2>
            <p>
                We are a team of experts dedicated to providing top-notch
                services in various fields.
                Our mission is to help our clients achieve their
                goals and exceed their expectations.
                We work diligently to ensure that our clients receive the
                highest quality service and support.
            </p>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="cta">Learn More</button>
        </div>
    );
}

export default HomePage;
