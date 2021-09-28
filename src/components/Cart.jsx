import React, { useEffect, useState } from "react";
import "./style.css";
import { CartState } from "../context/Context";
import { Button, Col, FormControl, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Rating from "./Rating";
import { actionTypes } from "../context/Reducers";

function Cart() {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <ListGroup>
            {cart.map((item) => {
              return (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col>
                      <img
                        alt={item.name}
                        className="cart-img"
                        src={item.image}
                      />
                    </Col>
                    <Col>{item.name}</Col>
                    <Col>
                      <Rating rating={item.ratings} />
                    </Col>
                    <Col>
                      <FormControl
                        onChange={(event) =>
                          dispatch({
                            type: actionTypes.CHANGE_QTY,
                            payload: {
                              id: item.id,
                              qty: event.target.value,
                            },
                          })
                        }
                        as="select"
                        value={item.qty}
                      >
                        {[...Array(5).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: actionTypes.REMOVE_FROM_CART,
                            payload: item,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div className="col-md-3 filter">
          <h5 style={{ marginBottom: 0 }}>Total items: {cart.length} item</h5>
          <h5 style={{ marginBottom: 30 }}>Total: {total} €</h5>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
