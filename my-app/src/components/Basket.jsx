import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CardItem.css';  

const Basket = (props) => {
  return (
    <div className="basket-container">
      <div className="basket-header">
        <h2>Корзина</h2>
      </div>

      <div className="card-container">
        {props.basketItems.length > 0 ? (
          <AnimatePresence>
            {props.basketItems.map((obj) => (
              <motion.div
                key={obj.id}
                className="card-item"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="card">
                  <Card.Img variant="top" src={obj.url} alt={obj.name} />
                  <Card.Body>
                    <Card.Title>{obj.name}</Card.Title>
                    <Card.Text>
                      {obj.description}
                      <br />
                      Price: {obj.price}
                    </Card.Text>
                    <Button onClick={() => props.deleteItem(obj.id)}>Удалить товар</Button>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="empty-basket">
            <p>Корзина пуста</p>
          </div>
        )}
      </div>

      {props.basketItems.length > 0 && (
        <div className="total">
          <p>Итого: {props.totalPrice}₽</p>
        </div>
      )}
    </div>
  );
};

export default Basket;
