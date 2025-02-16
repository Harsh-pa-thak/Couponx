import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add a coupon to the cart
    const addToCart = (coupon) => {
        setCart((prevCart) => {
            // Check if the coupon already exists in the cart
            const isCouponInCart = prevCart.some((item) => item.id === coupon.id);
            if (!isCouponInCart) {
                return [...prevCart, coupon];
            } else {
                alert("This coupon is already in your cart!");
                return prevCart;
            }
        });
    };

    // Remove a coupon from the cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((coupon) => coupon.id !== id));
    };

    // Clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate the total discount in the cart
    const calculateTotalDiscount = () => {
        return cart.reduce((total, coupon) => total + coupon.discount, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                calculateTotalDiscount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};