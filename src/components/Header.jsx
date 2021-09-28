import React from "react";
import "./style.css";
import {
  Nav,
  Navbar,
  Container,
  FormControl,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { actionTypes } from "../context/Reducers";

function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="primary" variant="dark" style={{ marginBottom: 15 }}>
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>

        <Navbar.Text variant="dark" className="search">
          <FormControl
            placeholder="Search a product"
            className="m-auto"
            style={{ width: 400 }}
            onChange={(e) =>
              productDispatch({
                type: actionTypes.FILTER_BY_SEARCH,
                payload: e.target.value,
              })
            }
          />
          {/* <FaSearch color="gray" fontSize="20px" className="search-icon" /> */}
        </Navbar.Text>

        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="info">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 360 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => {
                    return (
                      <span className="cartitem" key={item.id}>
                        <img
                          src={item.image}
                          className="cartItemImg"
                          alt={item.name}
                        />
                        <div className="cartItemDetail">
                          <span>{item.name}</span>
                          <span>{item.price.split(".")[0]} €</span>
                        </div>
                        <AiFillDelete
                          onClick={() =>
                            dispatch({
                              type: actionTypes.REMOVE_FROM_CART,
                              payload: item,
                            })
                          }
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    );
                  })}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Card is empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
