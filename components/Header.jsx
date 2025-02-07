import React, { useState } from "react";

const Header = ({ cart, toggleCart }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace("€", "").trim()), 0)
    .toFixed(2);

  return (
    <header className="header">
      <h1>Shop</h1>
      <div
        className={`cart-info ${totalItems > 0 ? "cart-warning" : ""}`}
        onClick={toggleCart}
      >
        <button>🛒</button>
        <span className="Span-Item">{totalItems} | Produkt/e im Warenkorb |</span>
        <span className="Span-Price">{totalPrice} €</span>
      </div>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
};

export default Header;
