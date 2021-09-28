import React from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import { actionTypes } from "../context/Reducers";
import Rating from "./Rating";
import "./style.css";

const Filter = () => {
  const {
    productState: { byStock, byDelivery, byRating, sort, searchQuery },
    productDispatch,
  } = CartState();
  console.log(byStock, byDelivery, byRating, sort, searchQuery);

  return (
    <div className="filter">
      <h2>Filter Products</h2>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onClick={() =>
            productDispatch({
              type: actionTypes.SORT_BY_PRICE,
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onClick={() =>
            productDispatch({
              type: actionTypes.SORT_BY_PRICE,
              payload: "hightToLow",
            })
          }
          checked={sort === "hightToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onClick={() =>
            productDispatch({
              type: actionTypes.FILTER_BY_STOCK,
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onClick={() =>
            productDispatch({
              type: actionTypes.FILTER_BY_DELIVERY,
            })
          }
          checked={byDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>
          Rating:
          <Rating
            rating={byRating}
            onClick={(index) =>
              productDispatch({
                type: actionTypes.FILTER_BY_RATING,
                payload: index + 1,
              })
            }
            style={{ cursor: "pointer" }}
          />
        </label>
      </span>
      <Button
        onClick={() =>
          productDispatch({
            type: actionTypes.CLEAR_SEARCH,
          })
        }
        variant="light"
        style={{ marginTop: 15 }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
