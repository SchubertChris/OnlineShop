import React from "react";
import PlaceholderSVG from "../components/PlaceholderSVG";

const ProductList = ({ products, addToCart }) => (
  <div className="product-list">
    {products.map((product) => {
      const numericPrice = parseFloat(product.price.toString().replace("€", "").trim()).toFixed(2);

      return (
        <div key={product.id} className="product-card">
          <PlaceholderSVG />
          <h3>{product.productName}</h3>
          <p className="Price-Card"><strong>{numericPrice} €</strong> </p>
          <p>{product.description}</p>
          {product.stock > 0 ? (
            <div className="button-container">
              <button className="buttonAdd" onClick={() => addToCart(product)}>Hinzufügen</button>
            </div>
          ) : (
            <p style={{ color: "red" }}>Nicht verfügbar</p>
          )}
        </div>
      );
    })}
  </div>
);

export default ProductList;
