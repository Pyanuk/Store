import React from 'react';
import './Home.css';
import AppleIcon from '@mui/icons-material/Apple';
import SamsungIcon from '@mui/icons-material/Android';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='welcome-text'>
        <h1>Добро пожаловать в интернет-магазин Pyanuk Store</h1>
        <p>Мы предлагаем широкий ассортимент продукции от таких известных брендов, как Apple и Samsung, а также многих других.</p>
      </div>
      <div className='brand-icons'>
        <AppleIcon sx={{ fontSize: 100, color: '#333' }} />
        <SamsungIcon sx={{ fontSize: 100, color: '#00695c' }} />
      </div>
    </div>
  );
};

export default Home;
