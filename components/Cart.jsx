import React, { useState, useEffect } from "react";
import PlaceholderSVG from "../components/PlaceholderSVG";

const Cart = ({ cart, removeFromCart, updateQuantity = () => {}, toggleCart, isOpen }) => {
  // Lokaler State für Mengen (initialisiert mit `cart`-Daten)
  const [quantities, setQuantities] = useState({});
  
  // Setzt die anfänglichen Mengenwerte basierend auf `cart`
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity; // Nimmt die voreingestellte Anzahl aus der Produktliste
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]); // Wird ausgeführt, wenn sich `cart` ändert

  // Schließt den Warenkorb, wenn er leer ist
  useEffect(() => {
    if (cart.length === 0 && isOpen) {
      toggleCart();
    }
  }, [cart, isOpen, toggleCart]);
  
  // Event-Handler für Mengenänderung
  const handleQuantityChange = (id, value) => {
    const newQuantity = value ? Math.max(1, parseInt(value, 10)) : 1;
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    updateQuantity(id, newQuantity);
  };
  
  // Berechnung der Gesamtmenge aller Artikel
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  
  console.log("🔄 Props in Cart:", { cart, removeFromCart, updateQuantity, isOpen, toggleCart });
  return (
    <div className={`cart ${isOpen ? "open" : ""}`} style={{ color: "white" }}>
      <p className="close-btn" onClick={toggleCart}>❌</p>
      <h2>🛒 Warenkorb</h2>
      <p>Gesamte Artikelanzahl: <strong>{totalItems}</strong></p>
      {cart.length === 0 ? (
        <p>Leer 😞</p>
      ) : (
        <ul>
          {cart.map(({ id, productName, price }) => {
            const numericPrice = parseFloat(price.toString().replace('€', '').trim());

            return (
              <li key={id}  className="cart-item">
                <PlaceholderSVG />
                <span className="cart-item-name"><strong>{productName}</strong></span>
                <span className="cart-item-price"><strong>Preis: {price}</strong></span>
                <div className="cart-buttons">
                  <input
                    type="number"
                    min="1"
                    value={quantities[id] || 1} // Standardwert aus der Produktliste
                    onChange={(e) => handleQuantityChange(id, e.target.value)}
                  />
                  <button className="btn-remove" onClick={() => removeFromCart(id)}>❌</button>
                </div>
                <span className="cart-item-total">
                  <strong>Gesamt: {(quantities[id] * numericPrice).toFixed(2)} €</strong>
                </span>
                <hr />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cart;
