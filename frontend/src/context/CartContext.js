import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    const updateCart = (cart) => {
        dispatch({ type: 'SET_CART', payload: cart });
    };

    const cartProductCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart: state.cart, updateCart, cartProductCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
