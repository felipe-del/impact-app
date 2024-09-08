import React from 'react';
import { Link } from 'react-router-dom';
import './about.css'; 

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to the About page of our application! We are dedicated to providing the best service and user experience. 
                Our team is passionate about building high-quality software solutions that meet the needs of our clients and users.
            </p>
            <p>
                Our mission is to deliver innovative and reliable products that help streamline and enhance your everyday tasks. 
                We continuously strive to improve our services and adapt to the evolving demands of the market.
            </p>
            <p>
                Thank you for visiting our About page. If you have any questions or need further information, please feel free to reach out to us.
            </p>
            <Link to="/auth" className="login-button">Go to Login</Link>
        </div>
    );
};

export default About;
