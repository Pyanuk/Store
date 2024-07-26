import React, { useState } from 'react';
import Item from './Item';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CardItem.css';

const CardItem = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const onAddBasket = async (obj) => {
    try {
      if (props.basketItems.find(item => Number(item.id) === Number(obj.id))) {
        await axios.delete(`http://localhost:3001/basket/${obj.id}`);
        props.setBasketItems((over) => over.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        await axios.post('http://localhost:3001/basket', obj);
        props.setBasketItems([...props.basketItems, obj]);
      }
    } catch (error) {
      alert('Error');
    }
  };

  const onAddFavorites = async (obj) => {
    try {
      if (props.favoritesItems.find(item => Number(item.id) === Number(obj.id))) {
        await axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        props.setFavoritesItems((over) => over.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        await axios.post('http://localhost:3001/favorites', obj);
        props.setFavoritesItems([...props.favoritesItems, obj]);
      }
    } catch (error) {
      alert('Error');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBrandFilter = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleTypeFilter = (event) => {
    setSelectedType(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredItems = props.item.filter((obj) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const lowercasedName = obj.name.toLowerCase();
    const price = parseInt(obj.price.replace('₽', '').replace(/\s+/g, ''), 10);

    const matchesSearch = lowercasedName.includes(lowercasedTerm);
    const matchesBrand = selectedBrand === '' || obj.brand === selectedBrand;
    const matchesType = selectedType === '' || obj.type === selectedType;
    const matchesPrice = (!minPrice || price >= parseInt(minPrice, 10)) && (!maxPrice || price <= parseInt(maxPrice, 10));

    return matchesSearch && matchesBrand && matchesType && matchesPrice;
  });

  return (
    <div className="card-item-container">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-container">
        <select onChange={handleBrandFilter} className="filter-select">
          <option value="">Все</option>
          <option value="google">Google</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
        </select>
        <select onChange={handleTypeFilter} className="filter-select">
          <option value="">Все</option>
          <option value="notebook">Ноутбуки</option>
          <option value="tablet">Планшеты</option>
          <option value="phone">Телефоны</option>
        </select>
        <input
          type="number"
          placeholder="Минимальная цена"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="price-input"
        />
        <input
          type="number"
          placeholder="Максимальная цена"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="price-input"
        />
      </div>
      <div className="card-container">
        {filteredItems.map(obj => (
          <motion.div
            key={obj.id}
            className="card-item"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Item 
              id={obj.id}
              myId={obj.myId}
              name={obj.name}
              description={obj.description}
              price={obj.price}
              url={obj.url}
              onPlus={onAddBasket}
              onClickFavorites={onAddFavorites}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CardItem;
