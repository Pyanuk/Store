import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './AboutTheProduct.css';
import { AppContext } from '../App';

const AboutTheProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const card = location.state;
  const { setBasketItems,setFavoritesItems, isAdded, isAddedFavorites } = useContext(AppContext);

  if (!card) {
    return <p>Продукт не найден.</p>;
  }

  const onAddBasket = async (obj) => {
    try {
      if (isAdded(obj.id)) {
        await axios.delete(`http://localhost:3001/basket/${obj.id}`);
        setBasketItems(prevItems => prevItems.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        await axios.post('http://localhost:3001/basket', obj);
        setBasketItems(prevItems => [...prevItems, obj]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };

  const onAddFavorites = async (obj) => {
    try {
      if (isAddedFavorites(obj.id)) {
        await axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavoritesItems(prevItems => prevItems.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        await axios.post('http://localhost:3001/favorites', obj);
        setFavoritesItems(prevItems => [...prevItems, obj]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в избранное');
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <Card>
          <Card.Img variant="top" src={card.url} alt={card.name} />
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <p><strong>Price:</strong> {card.price}</p>
            <Button variant="primary" onClick={() => onAddBasket(card)}>{isAdded(card.id) ? 'Добавлено в корзину' : 'Добавить в корзину'}</Button>
            <Button variant="primary" onClick={() => onAddFavorites(card)}>{isAddedFavorites(card.id) ? 'Добавлено в избранное' : 'Добавить в избранное'}</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AboutTheProduct;
