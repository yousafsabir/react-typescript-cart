import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type Props = {
    id: number;
    qty: number;
};

const CartItemCard: React.FC<Props> = ({ id, qty }) => {
    const { removeItem } = useCart();
    const item = storeItems.find((i) => i.id === id);
    if (item == null) return null;

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center"
        >
            <img
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
                alt=""
            />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {qty > 1 && (
                        <span
                            className="text-muted"
                            style={{ fontSize: ".65rem" }}
                        >
                            x{qty}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * qty)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeItem(item.id)}
            >
                &times;
            </Button>
        </Stack>
    );
};

export default CartItemCard;
