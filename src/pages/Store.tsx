import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import Items from "../data/items.json";
import ItemCard from "../components/ItemCard";

const Store: FC = () => {
    return (
        <>
            <h1>Store</h1>
            <Row xs={1} md={2} lg={3} className="g-3">
                {Items.map((item) => {
                    return (
                        <Col key={item.id}>
                            <ItemCard {...item} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default Store;
