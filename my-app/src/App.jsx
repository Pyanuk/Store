import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CardItem from "./components/CardItem";
import Header from "./components/Header";
import Basket from "./components/Basket";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import About_Сompany from "./components/About_Сompany";
import ContactForm from "./components/ContactForm";
import AboutTheProduct from "./components/AboutTheProduct";

export const AppContext = React.createContext({});

function App() {
  const [card, setCard] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [homeItems, setHomeItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [about_companyItems, setAboutCompanyItems] = useState([]);
  const [contactformItems, setContactformItems] = useState([]);

  useEffect(() => {
    async function axiosData() {
      const cardData = await axios.get('http://localhost:3001/card');
      const basketData = await axios.get('http://localhost:3001/basket');
      const homeData = await axios.get('http://localhost:3001/home');
      const favoritesData = await axios.get('http://localhost:3001/favorites');
      const about_company = await axios.get('http://localhost:3001/about_company');
      const contactform = await axios.get('http://localhost:3001/contactform');

      setCard(cardData.data);
      setBasketItems(basketData.data);
      setHomeItems(homeData.data);
      setFavoritesItems(favoritesData.data);
      setAboutCompanyItems(about_company.data);
      setContactformItems(contactform.data);
    }
    axiosData();
  }, []);

  const isAdded = (myId) => {
    return basketItems.some((objIsAdded) => objIsAdded.myId === myId);
  };

  const isAddedFavorites = (myId) => {
    return favoritesItems.some((objIsAdded) => objIsAdded.myId === myId);
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3001/basket/${id}`);
    setBasketItems((over) => basketItems.filter(item => Number(item.id) !== Number(id)));
  };

  const deleteFavoritesItem = (id) => {
    axios.delete(`http://localhost:3001/favorites/${id}`);
    setFavoritesItems((over) => favoritesItems.filter(item => Number(item.id) !== Number(id)));
  };

  const totalPrice = basketItems.reduce((total, obj) => total + parseFloat(obj.price), 0);

  return (
    <AppContext.Provider
      value={{
        card,
        setCard,
        basketItems,
        setBasketItems,
        isAdded,
        deleteFavoritesItem,
        isAddedFavorites,
        favoritesItems,
        setFavoritesItems
      }}
    >
      <div>
        <Header />
        <Routes>
          <Route
            path='/card'
            element={
              <CardItem
                item={card}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                favoritesItems={favoritesItems}
                setFavoritesItems={setFavoritesItems}
              />
            }
          />
          <Route
            path='/basket'
            element={
              <Basket
                basketItems={basketItems}
                deleteItem={deleteItem}
                totalPrice={totalPrice}
              />
            }
          />
          <Route
            path='/abouttheproduct/:id'
            element={
              <AboutTheProduct />
            }
          />
          <Route
            path='/contactform'
            element={
              <ContactForm contactformItems={contactformItems} />
            }
          />
          <Route
            path='/home'
            element={<Home homeItems={homeItems} />}
          />
          <Route
            path='/about_company'
            element={<About_Сompany about_companyItems={about_companyItems} />}
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                favoritesItems={favoritesItems}
                deleteFavoritesItem={deleteFavoritesItem}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
