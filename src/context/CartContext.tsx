import React, { createContext, FC, useContext, useState } from "react";

const CartContext = createContext({});

type CartTypes = {
    getItemQty: (id: number) => number;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    removeItem: (id: number) => void;
};

type CartItem = {
    id: number;
    qty: number;
};

export const useCart = () => {
    return useContext(CartContext);
};

interface Props {
    children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const getItemQty = (id: number) => {
        return cartItems.find((item) => item.id === id)?.qty || 0;
    };

    const increaseQty = (id: number) => {
        setCartItems((items) => {
            if (items.find((item) => item.id === id) === null) {
                return [...items, { id, qty: 1 }];
            } else {
                return items.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.qty + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseQty = (id: number) => {
        setCartItems((items) => {
            if (items.find((item) => item.id === id)?.qty === 1) {
                return items.filter((item) => item.id !== id);
            } else {
                return items.map((item) => {
                    if (item.id === id) {
                        return { ...item, qty: item.qty - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    function removeItem(id: number) {
        setCartItems((items) => items.filter((item) => item.id !== id));
    }

    return (
        <CartContext.Provider
            value={{ getItemQty, increaseQty, decreaseQty, removeItem }}
        >
            {children}
        </CartContext.Provider>
    );
};
