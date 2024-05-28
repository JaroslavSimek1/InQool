import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className='home-page'>
        <h1 className='homepage-header hover-text'>This page was created as interview task</h1>
        <div className='image-container'>
            <div>
            <Link to="/users">
                <img src="/images/users.png" alt="Users" style={{ maxHeight: '200px' }} />
            </Link>
            </div>
            <div>
            <Link to="/animals">
                <img src="/images/animals.png" alt="Animals" style={{ maxHeight: '200px' }} />
            </Link>
            </div>
        </div>
        </div>
  );
};

export default HomePage;
