import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";

interface Props {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

const ItemCard: FC<Props> = ({ id, name, price, imgUrl }) => {
    const { getItemQty, increaseQty, decreaseQty, removeItem } = useCart();
    const quantity = getItemQty(id);
    console.log(quantity);

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">
                        {formatCurrency(price)}
                    </span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            onClick={() => increaseQty(id)}
                        >
                            + Add To Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button onClick={() => decreaseQty(id)}>
                                    -
                                </Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in
                                    cart
                                </div>
                                <Button onClick={() => increaseQty(id)}>
                                    +
                                </Button>
                            </div>
                            <Button
                                onClick={() => removeItem(id)}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ItemCard;
