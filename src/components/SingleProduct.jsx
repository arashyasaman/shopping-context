import React from "react";
import "./style.css";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";
import { actionTypes } from "../context/Reducers";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="col-md-4 product-item" style={{ marginBottom: 15 }}>
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title className="product-name">{product.name}</Card.Title>
          <Card.Text>
            <span>{product.price} €</span>
          </Card.Text>
          <Card.Text>
            {product.fastDelivery ? (
              <span>Fast Delivery</span>
            ) : (
              <span>4 Days Delivery</span>
            )}
          </Card.Text>
          <Card.Text>
            <Rating rating={product.ratings} />
          </Card.Text>

          {cart.some((d) => d.id === product.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: actionTypes.REMOVE_FROM_CART,
                  payload: product,
                });
              }}
              variant="danger"
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: actionTypes.ADD_TO_CART,
                  payload: product,
                });
              }}
              disabled={!product.inStock}
              variant="primary"
            >
              {product.inStock ? (
                <span>Add to cart</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
