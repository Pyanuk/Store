import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from '../App';

function Item(props) {
  const context = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const onClickAdd = () => {
    const { id, myId, name, description, price, url } = props;
    props.onPlus({ id, myId, name, description, price, url });
  };

  const onClickFavorites = () => {
    const { id, myId, name, description, price, url } = props;
    props.onClickFavorites({ id, myId, name, description, price, url });
  };

  const toggleExpandText = () => {
    setExpanded(!expanded);
  };

  const goToProductPage = () => {
    const { id, myId, name, description, price, url } = props;
    navigate(`/abouttheproduct/${myId}`, { state: { id, myId, name, description, price, url } });
  };

  const renderDescription = () => {
    if (expanded) {
      return (
        <>
          <p>{props.description}</p>
          <Button variant="link" onClick={toggleExpandText}>
            Скрыть
          </Button>
        </>
      );
    } else {
      return (
        <>
          <p>{props.description.slice(0, 100)}...</p>
          {props.description.length > 100 && (
            <Button variant="link" onClick={toggleExpandText}>
              Показать больше
            </Button>
          )}
        </>
      );
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.url} alt={props.name} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {renderDescription()}
          <br />
          Price: {props.price} 
        </Card.Text>
        <Button onClick={onClickAdd}>
          {context.isAdded(props.myId) ? 'Добавлено в корзину' : 'Добавить в корзину'}
        </Button>
        <Button onClick={onClickFavorites}>
          {context.isAddedFavorites(props.myId) ? 'Добавлено в избранное' : 'Добавить в избранное'}
        </Button>
        <Button onClick={goToProductPage} variant="primary">
          О товаре
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
