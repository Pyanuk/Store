import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Favorites = (props) => {
  const { favoritesItems, deleteFavoritesItem, basketItems, setBasketItems } = props;

  const isAdded = (itemId) => {
    return basketItems.some(item => item.id === itemId);
  };

  const onAddBasket = async (obj) => {
    try {
      if (isAdded(obj.id)) {
        await axios.delete(`http://localhost:3001/basket/${obj.id}`);
        setBasketItems(prevItems => prevItems.filter(item => item.id !== obj.id));
      } else {
        await axios.post('http://localhost:3001/basket', obj);
        setBasketItems(prevItems => [...prevItems, obj]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };

  return (
    <div>
      <div>
        <h2>Избранное</h2>
      </div>
      <div className="card-container">
        {favoritesItems.length > 0 ? (
          favoritesItems.map((obj) => (
            <div key={obj.id} className="card-item">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={obj.url} alt={obj.name} />
                <Card.Body>
                  <Card.Title>{obj.name}</Card.Title>
                  <Card.Text>
                    {obj.description}
                    <br />
                  </Card.Text>
                  <Button onClick={() => deleteFavoritesItem(obj.id)}>Удалить избранное</Button>
                  <Button onClick={() => onAddBasket(obj)}>Добавить в корзину</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>Избранное пусто</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
