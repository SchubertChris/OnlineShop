import React, { useState, useCallback, useMemo } from "react";
import ProductList from "./ProductList.jsx";
import Cart from "./Cart.jsx";

export default function App() {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addToCart = useCallback((product) => {
        console.log("🔄 addToCart wurde aufgerufen mit:", product);

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                console.log("🛒 Menge erhöhen für:", product.id);
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                console.log("🆕 Neues Produkt hinzufügen:", product);
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }, []);

    const updateQuantity = useCallback((productId, newQuantity) => {

        console.log("🔄 updateQuantity wurde aufgerufen mit:", productId, newQuantity);

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        );
    }, []);

    const removeFromCart = useCallback((productId) => {
        console.log("❌ Produkt entfernen:", productId);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }, []);

    const cartMemo = useMemo(() => cart, [cart]);
    console.log("🛠️ updateQuantity in App.jsx:", typeof updateQuantity);

    return (
        <div className="container">
            <header className="Header">
                <h1>Mein Shop</h1>
                <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "Warenkorb schließen" : "Warenkorb öffnen"}
                </button>
            </header>

            <main className="main-content">
                <ProductList products={[
                    { id: 1, productName: "Virtuoso RGB Wireless", price: "1199.97 €", stock: 5, description: "Gaming-Headset" }
                ]} addToCart={addToCart} />

                <Cart
                    cart={cartMemo}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    isOpen={isOpen}
                    toggleCart={() => setIsOpen(!isOpen)}
                />
            </main>
        </div>
    );
}
