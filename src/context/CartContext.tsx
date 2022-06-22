import React, { createContext, FC, useContext, useState } from "react";
import Cart from "../components/Cart";

type CartItem = {
    id: number;
    qty: number;
};

type CartTypes = {
    getItemQty: (id: number) => number;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    removeItem: (id: number) => void;
    openCart: () => void;
    closeCart: () => void;
    isOpen: boolean;
    cartQty: number;
    cartItems: CartItem[];
};

const CartContext = createContext({} as CartTypes);

export const useCart = () => {
    return useContext(CartContext);
};

interface Props {
    children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openCart = () => setIsOpen(true);

    const closeCart = () => setIsOpen(false);

    const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

    const getItemQty = (id: number) => {
        return cartItems.find((item) => item.id === id)?.qty || 0;
    };

    const increaseQty = (id: number) => {
        setCartItems((items) => {
            if (items.find((item) => item.id === id) == null) {
                return [...items, { id, qty: 1 }];
            } else {
                return items.map((item) => {
                    if (item.id === id) {
                        return { ...item, qty: item.qty + 1 };
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
            value={{
                getItemQty,
                increaseQty,
                decreaseQty,
                removeItem,
                openCart,
                closeCart,
                cartQty,
                cartItems,
                isOpen,
            }}
        >
            {children}
            <Cart />
        </CartContext.Provider>
    );
};
